<script setup>
import modal from './ModalChild.vue'
import { ref } from 'vue'
import { defineExpose } from 'vue';
const showModal = ref(false)
const txt = ref('Loading...');
const backgroundColour = ref('#69ccc971');
const colour = ref('white');
const fetchServerStatus = async () => {
  txt.value = 'Loading...';
  backgroundColour.value = '#69ccc971';
  try {
    const response = await fetch('https://watch.fartflix.com/System/Ping');
    if (response.status === 200 && response.ok) {
      const responseBody = await response.text();
      txt.value = "Online";
      backgroundColour.value = '#69ccc94b';
      colour.value="#69CCC9";
    } else {
      txt.value = 'Offline';
      backgroundColour.value = '#CC69694b';
      colour.value="#CC6969";
    }
  } catch (error) {
    txt.value = 'Offline';
    backgroundColour.value = '#CC69694b';
    colour.value="#CC6969";
  }
};
const openModal = () => {
  showModal.value = true;
  fetchServerStatus();
};
defineExpose({
  openModal,
});
</script>
<template>
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 style="color: white;">Server Status</h3>
      </template>
      <template #body>
        <h3 :style="{ backgroundColor: backgroundColour, color: colour, padding: '10px', borderRadius: '15px', textAlign: 'center',fontWeight:'bolder'}">{{txt}}</h3>
      </template>
      <template #footer>
        <button @click="showModal = false" style="background-color:black;">Close</button>
      </template>
    </modal>
  </Teleport>
</template>