<template>
    <div class="attendance-records">
      <h1>Registros de Asistencia</h1>
      <form @submit.prevent="fetchRecords">
        <label for="start_date">Fecha de Inicio:</label>
        <input type="date" id="start_date" v-model="startDate" required>
        <label for="end_date">Fecha de Fin:</label>
        <input type="date" id="end_date" v-model="endDate" required>
        <button type="submit">Obtener Registros</button>
      </form>
      <div id="results">
        <table v-if="records.length">
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
        <p v-else>No hay registros disponibles.</p>
      </div>
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
        records: []
      };
    },
    methods: {
      fetchRecords() {
        axios.get('http://10.243.176.227:5000/attendance', {
          params: {
            start_date: this.startDate,
            end_date: this.endDate
          }
        })
        .then(response => {
          this.records = response.data;
        })
        .catch(error => {
          console.error('Error al obtener los registros de asistencia:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .attendance-records {
    text-align: center;
    margin-top: 50px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  label {
    margin: 5px 0;
  }
  input {
    margin: 5px 0;
    padding: 5px;
  }
  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #ffcc00;
    border: none;
    color: #000;
    font-weight: bold;
    cursor: pointer;
  }
  button:hover {
    background-color: #ff9900;
  }
  #results {
    margin-top: 20px;
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