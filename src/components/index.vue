<script setup>
import WelcomeItem from './WelcomeItem.vue'
import PlansIcon from './icons/IconPlans.vue'
import CatalogIcon from './icons/IconCatalog.vue'
import GetStartedIcon from './icons/IconGetStarted.vue'
import MemberIcon from './icons/IconMember.vue'
import Switcher from './Switcher.vue'
import Popup from './Popup.vue'
import Login from './Login.vue'
import Catalog from './Catalog.vue'
import Terms from './TermsPopup.vue'
import Status from './ServerStatus.vue'
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Papa from 'papaparse';
import SelectButton from 'primevue/selectbutton';
import Clients from './Clients.vue'
const Statu = ref(null);
const openStatus = () => {
  Statu.value.openModal();
};
const Log = ref(null);
const openLog = () => {
  Log.value.openModal();
};
const Cat = ref(null);
// const openMovies = () => {
//   Cat.value.Movies();
// };
// const openShows = () => {
//   Cat.value.TV();
// };
import SignUp from './SignUp.vue'
const Sign = ref(null);
const openSignUp = (txt) => {
  Sign.value.openModal(txt);
};
const Pop = ref(null);
const openPopup = () => {
  Pop.value.openModal();
  closeModal();
};
const Client = ref(null);
const openClient = () => {
  Client.value.openModal();
  closeModal();
};
const dialogVisibleMovies = ref(false);
const dialogVisibleShows = ref(false);
const tableData = ref([]);
const columns = ref([]);
const dataCache = ref({});
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
const openMovies = async () => {
  dialogVisibleMovies.value = true;
  await loadCSV('/Movies.csv');
};
const openShows = async () => {
  dialogVisibleShows.value = true;
  await loadCSV('/Shows.csv');
};
</script>
<template>
  <WelcomeItem>
    <template #icon>
      <PlansIcon />
    </template>
    <template #heading>Plans</template>
    <h4 style="color:white;">FartFlix<span style="color:#69CCC9;">+</span> Monthly</h4>(Access to 1,100+ movies & 9,000+ episodes of TV + 1 free monthly request): <br>$<span style="color:#69CCC9;">6</span>/month<sup>1</sup></br>
    <h4 style="color:white;">FartFlix<span style="color:#69CCC9;">+</span> Annual</h4>(Access to 1,100+ movies & 9,000+ episodes of TV + 1 free monthly request): <br>$<span style="color:#69CCC9;">55</span>/year<sup>1</sup>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <CatalogIcon />
    </template>
    <template #heading>Catalog</template>
    <a href="#" @click.prevent="openMovies" style="color: #69CCC9;">Movies</a>
    <span> | </span>
    <a href="#" @click.prevent="openShows" style="color: #69CCC9;">Shows</a>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <GetStartedIcon />
    </template>
    <template #heading>Get Started</template>
    <a href="#" @click.prevent="openSignUp" style="color: #69CCC9;">Sign up</a><sup>2</sup><span> | </span><a href="#" @click.prevent='openPopup("Terms and Conditions","h1","b1","h2","b2","h3","b3","h4","b4","h5","b5","h6","b6")'>Terms and Conditions</a>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <MemberIcon />
    </template>
    <template #heading>Already a FartFlix+ Member?</template>
    <a href="https://watch.fartflix.com" target="_blank" rel="noopener">Start streaming</a><span> | </span>
    <a href="https://request.fartflix.com" target="_blank" rel="noopener">Make a request</a><span> | </span>
    <a href="#" @click.prevent="openClient" style="color: #69CCC9;">Clients</a><span> | </span>
    <a href="#" @click.prevent="openStatus" style="color: #69CCC9;">Server status</a>
  </WelcomeItem>
  <Terms>
    <template #txt>
      <a href="#" @click.prevent='openPopup()'>Terms and Conditions</a>
    </template>
  </Terms>
  <Status ref="Statu"/>
  <Login ref="Log"/>
  <Catalog ref="Cat"/>
  <SignUp ref="Sign"/>
  <Terms ref="Pop"/>
  <Clients ref="Client"/>
  <Dialog v-model:visible="dialogVisibleMovies" :header="'Movies ('+tableData.length+')'" :style="{ width: '75vw'}" maximizable modal :contentStyle="{ height: '70vh' }" class="custom-dialog">
    <DataTable :value="tableData" scrollable scrollHeight="flex" tableStyle="min-width: 50rem" removableSort class="custom-table">
      <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" sortable />
    </DataTable>
  </Dialog>
  <Dialog v-model:visible="dialogVisibleShows" :header="'Shows ('+tableData.length+')'" :style="{ width: '75vw'}" maximizable modal :contentStyle="{ height: '70vh' }" class="custom-dialog">
    <DataTable :value="tableData" scrollable scrollHeight="flex" tableStyle="min-width: 50rem;" removableSort class="custom-table">
      <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" sortable />
    </DataTable>
  </Dialog>
</template>
<style>
.p-dialog-header {
  background-color: #1e1e1e !important;
  color: white !important;
  border-bottom: none !important;
}
.custom-dialog .p-dialog-content {
  background-color: #1e1e1e !important;
  color: white !important;
  padding:0;
}
.custom-table {
  background-color: transparent !important;
  color: white !important;
  word-wrap: break-word;
  word-break: break-word;
}
.custom-table .p-datatable-tbody > tr {
  background-color: transparent !important;
  color: white !important;
}
.custom-table .p-datatable-thead > tr > th {
  background-color: #1e1e1e !important;
  color: white !important;
}
</style>