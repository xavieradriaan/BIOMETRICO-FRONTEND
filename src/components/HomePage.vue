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
}
</style>