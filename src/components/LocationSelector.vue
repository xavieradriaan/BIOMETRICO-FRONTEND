<template>
    <div class="location-selector">
      <label for="location">Seleccione el lugar:</label>
      <select id="location" v-model="selectedLocation">
        <option>Inbalnor-Milagro</option>
        <option>Nicovita-Perú</option>
        <option>Matriz-Durán</option>
      </select>
      <button @click="selectLocation">Seleccionar</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedLocation: 'Inbalnor-Milagro'
      };
    },
    methods: {
      selectLocation() {
        this.$emit('locationSelected', this.selectedLocation);
      }
    }
  };
  </script>
  
  <style scoped>
  .location-selector {
    margin-top: 20px;
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
  </style>