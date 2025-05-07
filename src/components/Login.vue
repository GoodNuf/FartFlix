<script setup>
import modal from './ModalChild.vue'
import { ref } from 'vue'
import { defineExpose } from 'vue';
const showModal = ref(false)
const txt = ref('Loading...');
const backgroundColour = ref('#69ccc971');
const colour = ref('white');
const openModal = (txt) => {
  showModal.value = true;
  txt.value = txt;
};
defineExpose({
  openModal,
});
</script>
<template>
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 style="color: white;">Login</h3>
      </template>
      <template #body>
        <h3>🚧 Coming Soon 🚧</h3>
        <!-- <h3 :style="{ backgroundColor: backgroundColour, color: colour, padding: '10px', borderRadius: '15px', textAlign: 'center',fontWeight:'bolder'}">{{txt}}</h3> -->
      </template>
      <template #footer>
        <button @click="showModal = false" style="background-color:black;">Close</button>
      </template>
    </modal>
  </Teleport>
</template>