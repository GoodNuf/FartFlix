<script setup>
import modal from './ModalChild.vue'
import { ref } from 'vue'
import { defineExpose } from 'vue';
const showModal = ref(false)
const header = ref('Loading...');
const body = ref('Loading...');
const backgroundColour = ref('#69ccc971');
const colour = ref('white');
const openModal = (txt,txt2) => {
  showModal.value = true;
  header.value=txt;
  body.value=txt2;
};
defineExpose({
  openModal,
});
</script>
<template>
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 style="color: white;">{{header}}</h3>
      </template>
      <template #body>
        <h3>{{body}}</h3>
      </template>
      <template #footer>
        <button @click="showModal = false" style="background-color:black;">Close</button>
      </template>
    </modal>
  </Teleport>
</template>
<style>
.modal-body {
  word-wrap: break-word;
  word-break: break-word;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>