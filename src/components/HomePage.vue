<template>
  <div class="home">
    <h1>Bienvenido al portal de marcaciones Citell</h1>
    <LocationSelector @locationSelected="handleLocationSelected" />
  </div>
</template>

<script>
import LocationSelector from './LocationSelector.vue';

export default {
  name: 'HomePage',
  components: {
    LocationSelector
  },
  methods: {
    handleLocationSelected(location) {
      if (location === 'Inbalnor-Milagro') {
        this.$router.push({ name: 'attendance' });
      } else {
        alert('Esta ubicación no está disponible actualmente.');
      }
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  background-color: #AFB2B7; /* Color del recuadro de bienvenida */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
  color: #333; /* Mantener el color del texto oscuro para buen contraste */
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>