<template>
  <div class="attendance-records">
    <h1>Registros de Asistencia Inbalnor</h1>
    <form @submit.prevent="fetchRecords">
      <div class="form-group">
        <label for="start_date">Fecha de Inicio:</label>
        <input type="date" id="start_date" v-model="startDate" @change="updateEndDate" @input="delayedShowPopup" required>
      </div>
      <div class="form-group">
        <label for="end_date">Fecha de Fin:</label>
        <input type="date" id="end_date" v-model="endDate" :min="minEndDate" :max="maxEndDate" required>
      </div>
      <div class="button-container">
        <button type="submit" :disabled="isLoading" :class="{ 'disabled-button': isLoading }">Obtener Registros</button>
        <span v-if="isLoading" class="countdown">{{ countdown }}s</span>
        <div v-if="isLoading" class="spinner"></div>
      </div>
    </form>
    <div id="results" v-if="records.length">
      <table>
        <thead>
          <tr>
            <th>ID de Empleado</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Primera Hora de Entrada</th>
            <th>Última Hora de Salida</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record['Employee ID']" :class="{ 'anomaly': record['First Check-In Time'] === record['Last Check-Out Time'] }">
            <td>{{ record['Employee ID'] }}</td>
            <td>{{ record['Name'] }}</td>
            <td>{{ formatDate(record['First Check-In Time']) }}</td>
            <td>{{ formatDateTime(record['First Check-In Time']) }}</td>
            <td>{{ formatDateTime(record['Last Check-Out Time']) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No hay registros disponibles.</p>
    <p class="warning">*Los empleados de amarillo son trabajadores que marcaron entrada, pero no salida. O viceversa*</p>
  </div>
</template>

<script>
import { fetchAttendanceRecords } from './attendanceService';

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      records: [],
      isLoading: false,
      countdown: 60
    };
  },
  computed: {
    minEndDate() {
      if (!this.startDate) return '';
      const startDate = new Date(this.startDate);
      if (isNaN(startDate.getTime())) return '';
      const minEndDate = new Date(startDate);
      minEndDate.setDate(startDate.getDate() + 1);
      return minEndDate.toISOString().split('T')[0];
    },
    maxEndDate() {
      if (!this.startDate) return '';
      const startDate = new Date(this.startDate);
      if (isNaN(startDate.getTime())) return '';
      const maxEndDate = new Date(startDate);
      maxEndDate.setDate(startDate.getDate() + 4); // Limitar a 2 días en total
      return maxEndDate.toISOString().split('T')[0];
    }
  },
  methods: {
    showPopup() {
      alert('Sólo puede escogerse 5 días máximo de rango por consulta.');
    },
    delayedShowPopup() {
      setTimeout(this.showPopup, 300); // Retrasa la aparición del mensaje emergente
    },
    updateEndDate() {
      const startDate = new Date(this.startDate);
      if (isNaN(startDate.getTime())) return;

      const minEndDate = new Date(startDate);
      const maxEndDate = new Date(startDate);

      minEndDate.setDate(startDate.getDate() + 1);
      maxEndDate.setDate(startDate.getDate() + 4); // Limitar a 5 días en total

      if (new Date(this.endDate) < minEndDate || new Date(this.endDate) > maxEndDate) {
        if (confirm('La fecha de fin está fuera del rango permitido. Sólo puede escoger un rango máximo de 5 días. ¿Desea reiniciar la fecha de fin?')) {
          this.endDate = '';
        }
      }
    },
    fetchRecords() {
      this.isLoading = true;
      this.countdown = 60;
      this.startCountdown();
      this.records = [];

      setTimeout(() => {
        fetchAttendanceRecords(this.startDate, this.endDate)
          .then(response => {
            this.records = response.data;
            this.resetForm();
          })
          .catch(error => {
            console.error('Error al obtener los registros de asistencia:', error);
          })
          .finally(() => {
            setTimeout(() => {
              this.isLoading = false;
            }, 60000);
          });
      }, 4000); // Espera de 4 segundos antes de realizar la solicitud
    },
    startCountdown() {
      const interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    },
    closeCalendar(event) {
      event.target.blur();
    },
    resetForm() {
      this.startDate = '';
      this.endDate = '';
    },
    formatDate(dateTime) {
      const date = new Date(dateTime);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('es-ES', options);
    },
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return date.toLocaleString('es-ES', options);
    }
  }
};
</script>

<style scoped>
.attendance-records {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
  text-align: center;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type="date"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 106px; /* Aumenta el ancho para asegurar que se vea todo el año */
  text-align: center;
  font-size: 14px;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 300px;
  position: relative;
}
button {
  padding: 10px 20px;
  background-color: var(--primary-color);
  border: none;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}
button:hover {
  background-color: var(--hover-color);
}
button.disabled-button {
  background-color: var(--disabled-color);
  cursor: not-allowed;
  opacity: 0.6;
}
.countdown {
  position: absolute;
  right: 5px; /* Ajusta esta posición según sea necesario */
  font-size: 1.2em;
  color: var(--error-color);
  font-weight: bold;
}
.spinner {
  position: absolute;
  right: -42px; /* Ajusta esta posición según sea necesario */
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
#results {
  margin-top: 20px;
  animation: slideIn 1s ease-in-out;
}
@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.anomaly {
  background-color: #fff3cd; /* Color amarillo claro */
}
.warning {
  text-align: center;
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
