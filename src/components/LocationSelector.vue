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
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: slideIn 1s ease-in-out;
  }
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  button {
    margin-top: 10px;
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
  </style>