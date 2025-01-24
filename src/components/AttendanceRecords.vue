<template>
    <div class="attendance-records">
      <h1>Registros de Asistencia Inbalnor</h1>
      <form @submit.prevent="fetchRecords">
        <div class="form-group">
          <label for="start_date">Fecha de Inicio:</label>
          <input type="date" id="start_date" v-model="startDate" @change="updateEndDate" @input="closeCalendar" required>
        </div>
        <div class="form-group">
          <label for="end_date">Fecha de Fin:</label>
          <input type="date" id="end_date" v-model="endDate" :min="minEndDate" :max="maxEndDate" @input="closeCalendar" required>
        </div>
        <div class="button-container">
          <button type="submit" :disabled="isLoading" :class="{ 'disabled-button': isLoading }">Obtener Registros</button>
          <span v-if="isLoading" class="countdown">{{ countdown }}s</span>
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
            <tr v-for="record in records" :key="record['Employee ID']">
              <td>{{ record['Employee ID'] }}</td>
              <td>{{ record['Name'] }}</td>
              <td>{{ record['Date'] }}</td>
              <td>{{ record['First Check-In Time'] }}</td>
              <td>{{ record['Last Check-Out Time'] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>No hay registros disponibles.</p>
      <p class="warning">*Los empleados que mantengan la misma hora de entrada y salida, significa que marcaron entrada, pero no salida o viceversa*</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        startDate: '',
        endDate: '',
        minEndDate: '',
        maxEndDate: '',
        records: [],
        isLoading: false,
        countdown: 60
      };
    },
    methods: {
      updateEndDate() {
        const startDate = new Date(this.startDate);
        const minEndDate = new Date(startDate);
        const maxEndDate = new Date(startDate);
  
        // Ajustar las fechas mínimas y máximas
        minEndDate.setDate(startDate.getDate() + 1);
        maxEndDate.setDate(startDate.getDate() + 3);
  
        // Formatear las fechas a YYYY-MM-DD
        this.minEndDate = minEndDate.toISOString().split('T')[0];
        this.maxEndDate = maxEndDate.toISOString().split('T')[0];
  
        // Resetear la fecha de fin si está fuera del nuevo rango
        if (new Date(this.endDate) < minEndDate || new Date(this.endDate) > maxEndDate) {
          this.endDate = '';
        }
  
        // Mostrar el pop-up
        alert('Sólo puede escogerse 3 días máximo de rango por consulta.');
      },
      fetchRecords() {
        this.isLoading = true;
        this.countdown = 60;
        this.startCountdown();
  
        // Limpiar el estado de records antes de realizar una nueva solicitud
        this.records = [];
  
        axios.get('http://10.243.176.227:5000/attendance', {
          params: {
            start_date: this.startDate,
            end_date: this.endDate
          }
        })
        .then(response => {
          // Asignar los datos recibidos directamente a records
          this.records = response.data;
        })
        .catch(error => {
          console.error('Error al obtener los registros de asistencia:', error);
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 60000); // 60 segundos
        });
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
    width: 85px;
    text-align: center; /* Asegura que el texto esté centrado */
    font-size: 14px;
  }
  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 300px; /* Ajusta el ancho según sea necesario */
    position: relative; /* Añade posición relativa para el contador */
  }
  button {
    padding: 10px 20px;
    background-color: #ffcc00;
    border: none;
    color: #000;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #ff9900;
  }
  button.disabled-button {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.6;
  }
  .countdown {
    position: absolute; /* Posiciona el contador de forma absoluta */
    right: 32px; /* Ajusta la posición del contador */
    font-size: 1.2em;
    color: #ff0000;
    font-weight: bold;
  }
  #results {
    margin-top: 20px;
    animation: slideIn 1s ease-in-out;
  }
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
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