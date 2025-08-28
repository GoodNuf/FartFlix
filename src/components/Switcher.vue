<script setup>
import { ref } from 'vue';
import SelectButton from 'primevue/selectbutton';


const value = ref('FartFlix+');
const options = ref(['FartFlix+', 'FartCloud+']);
</script>

<template>
  <div class="switcher-container">
    <div class="middle">
      <div class="card flex justify-center">
        <SelectButton v-model="value" :options="options"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.switcher-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* Optional: add margin-bottom if you want space below the switcher */
}

.middle {
  background-color: #181818;
  border-radius: 15px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: transparent;
  box-shadow: none;
}

.p-selectbutton .p-button {
  background-color: black;
  border-color: black;
  color: white;
  --p-button-primary-hover-background: #6e4f0d;
}
</style>