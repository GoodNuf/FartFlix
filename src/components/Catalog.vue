<script setup>
import modal from './ModalChild.vue';
import { ref } from 'vue';
import { defineExpose } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Papa from 'papaparse';
const showModal = ref(false);
const header = ref('Catalog');
const tableData = ref([]);
const columns = ref([]);
const dataCache = ref({});
const isLoading = ref(false);
const loadCSV = async (filePath) => {
  if (dataCache.value[filePath]) {
    const cachedData = dataCache.value[filePath];
    tableData.value = cachedData.data;
    columns.value = cachedData.columns;
    return;
  }
  const response = await fetch(filePath);
  const csvText = await response.text();
  Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const parsedData = results.data;
      const parsedColumns = Object.keys(parsedData[0]).map((key) => ({
        field: key,
        header: key,
      }));
      dataCache.value[filePath] = {
        data: parsedData,
        columns: parsedColumns,
      };
      tableData.value = parsedData;
      columns.value = parsedColumns;
    },
  });
};
const Movies = async () => {
  showModal.value = true;
  header.value = 'Movies';
  isLoading.value = true;
  await loadCSV('src/assets/Movies.csv');
  isLoading.value = false;
};
const TV = async () => {
  showModal.value = true;
  header.value = 'TV Shows';
  isLoading.value = true;
  await loadCSV('src/assets/Shows.csv');
  isLoading.value = false;
};
defineExpose({
  Movies,
  TV,
});
</script>
<template>
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 style="color: white;">{{ header }}</h3>
      </template>
      <template #body>
        <div v-if="isLoading" id="spinner" style="display: flex;">
          <div class="spring-spinner" style="margin: 0 auto;">
            <div class="spring-spinner-part top">
              <div class="spring-spinner-rotator"></div>
            </div>
            <div class="spring-spinner-part bottom" style="margin: 0 auto;">
              <div class="spring-spinner-rotator"></div>
            </div>
          </div>
        </div>
        <!-- <DataTable v-else :value="tableData" class="p-datatable-gridlines custom-table"> -->
        <DataTable :value="tableData" tableStyle="min-width: 50rem" name="custom-table" removableSort scrollable scrollHeight="70vh">
          <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" sortable/>
        </DataTable>
      </template>
      <template #footer>
        <button @click="showModal = false" style="background-color:black;">Close</button>
      </template>
    </modal>
  </Teleport>
</template>
<style>
.modal-body {
  max-height: 70vh;
  overflow-y: none;
  padding: 10px;
  border-radius: 10px;
}
.close-button {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
.close-button:hover {
  background-color: #444;
}
.modal {
  display: inline-block;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
}
.custom-table {
  background-color: transparent;
  color: white;
  word-wrap: break-word;
  word-break: break-word;
}
.custom-table .p-datatable-tbody > tr {
  background-color: transparent;
  color: white;
}
.custom-table .p-datatable-tbody > tr:hover {
  background-color: #444;
}
.custom-table .p-datatable-thead > tr > th {
  background-color: transparent;
  color: white;
}
</style>