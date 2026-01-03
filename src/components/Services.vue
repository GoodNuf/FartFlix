<script setup>
import modal from './ModalChild.vue'
import RadioButton from 'primevue/radiobutton';
import ToggleButton from 'primevue/togglebutton';
import Terms from './TermsPopup.vue'
import { ref, watch, onMounted } from 'vue'
import { defineExpose } from 'vue';
const showModal = ref(false)
const admin = ref(false)
const toggle = ref(false)
const txt = ref('Loading...');
const plan = ref('android');
const openModal = () => {
  showModal.value = true;
  txt.value='Sign Up';
};
const openModalAdmin = () => {
  showModal.value = true;
  txt.value='Sign Up';
  admin.value = true;
};
defineExpose({
  openModal,
  openModalAdmin
});
const openClientLink = (url) => {
  window.open(url, '_blank');
};
// persist config to server (if available). Falls back to localStorage.
async function persistConfig(val) {
  // always save locally for immediate persistence per-browser
  localStorage.setItem('signups', JSON.stringify(val));
  try {
    // your server should expose an endpoint to write config.json
    const res = await fetch('public/config.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signups: !!val })
    });
    if (!res.ok) throw new Error('persist failed');
  } catch (e) {
    console.warn('Could not persist to server; saved locally only.', e);
  }
}
watch(toggle, (val) => {
  console.log('Signups toggled:', val);
  persistConfig(val);
});
onMounted(async () => {
  // 1) try to read public/config.json
  try {
    const r = await fetch('/config.json', { cache: 'no-cache' });
    if (r.ok) {
      const data = await r.json();
      if (typeof data.signups === 'boolean') {
        toggle.value = data.signups;
        return;
      }
    }
  } catch (e) {
    console.warn('Could not load /config.json', e);
  }
  // 2) fallback to localStorage
  const local = localStorage.getItem('signups');
  if (local !== null) {
    toggle.value = JSON.parse(local);
  }
});

import Popup from './Popup.vue'
const Pop = ref(null);
</script>
<template style="overflow-y: hidden;">
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 style="color: white;">Included Services</h3>
      </template>
      <template #body>
          <div id="androidClients" v-if="plan==='android'">
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 0px;"@click="openClientLink('https://vault.fartflix.com')">Vaultwarden</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 0px;"@click="openClientLink('https://pdf.fartflix.com/')">PDF Editing</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 0px;"@click="openClientLink('https://it-tools.fartflix.com/')">IT-Tools</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 0px;"@click="openClientLink('https://omni-tools.fartflix.com/')">Omni-Tools</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 0px;"@click="openClientLink('https://encrypt.fartflix.com/')">File Encryption</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 0px;"@click="openClientLink('https://matchering.fartflix.com/')">Audio Mastering</label>
            </div><br v-if=admin>
            <div class="label-container" v-if="admin">
              <ToggleButton v-model="toggle" onLabel="Signups enabled" offLabel="Signups disabled" style="display: none;"/>
              <label
                :class="{ active: toggle }"
                style="margin-left: 0px; cursor: pointer;"
                @click="toggle = !toggle"
              >
                {{ toggle ? 'Signups enabled' : 'Signups disabled' }}
              </label>
            </div>
          </div>
      </template>
      <template #footer>
        <button @click="showModal = false">Close</button>
      </template>
    </modal>
  </Teleport>
  <Popup ref="Pop"/>
  <Terms ref="PopT"/>
</template>
<style>
input, button{
  background-color: #303030!important;
  color:#ffffff96!important;
  --p-inputtext-color:white!important;
  user-select: none;
  transition: background-color 0.2s ease,color 0.2s ease;
  border:0!important;
}
input:hover, button:hover{
  background-color: #585858!important;
  color: white!important;
  --p-inputtext-color:white!important;
}
input:active, button:active{
  background-color: #111111!important;
  color: #585858!important;
  --p-inputtext-color:white!important;
  --p-togglebutton-checked-background:#111111!important;
}
.label-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  gap: 4px;
}
input[type="checkbox"]:checked {
  background-color: #69ccc9 !important; /* Desired background color */
  border: none !important; /* Disable the border */
}
.label-container label {
  flex: 1 1 fit-content;
  cursor: pointer;
  text-align: center;
  padding: 8px;
  background-color: #303030;
  border-radius: 6px;
  transition: background-color 0.2s ease, color 0.2s ease;
  user-select: none;
  word-wrap: break-word;
  word-break: break-word;
}
label:hover{
  background-color: #585858;
  color: white;
}
label:active{
  background-color: #111111;
  color: #585858;
}
label.active{
  background-color: #69ccc98f!important;
  color: white;
}
label.active:hover{
  background-color: #69ccc9d2!important;
  color: white;
}
label.active:active{
  background-color: #69ccc94f!important;
  color: white;
}
.p-floatlabel{
  margin:20px 0;
  margin-top: 0;
}
input[type="checkbox"]:checked {
  background-color: #69ccc9 !important; /* Change this to your desired color */
  border-color: #69ccc9 !important; /* Optional: Change the border color */
}
.spring-spinner, .spring-spinner * {
      box-sizing: border-box;
    }

    .spring-spinner {
      height: 60px;
      width: 60px;
    }

    .spring-spinner .spring-spinner-part {
      overflow: hidden;
      height: calc(60px / 2);
      width: 60px;
    }

    .spring-spinner  .spring-spinner-part.bottom {
      transform: rotate(180deg) scale(-1, 1);
    }

    .spring-spinner .spring-spinner-rotator {
      width: 60px;
      height: 60px;
      border: calc(60px / 7) solid transparent;
      border-right-color: #69ccc9d2;
      border-top-color: #69ccc9d2;
      border-radius: 50%;
      box-sizing: border-box;
      animation: spring-spinner-animation 3s ease-in-out infinite;
      transform: rotate(-200deg);
    }

    @keyframes spring-spinner-animation {
      0% {
        border-width: calc(60px / 7);
      }
      25% {
        border-width: calc(60px / 23.33);
      }
      50% {
        transform: rotate(115deg);
        border-width: calc(60px / 7);
      }
      75% {
        border-width: calc(60px / 23.33);
      }
      100% {
        border-width: calc(60px / 7);
      }
    }
</style>