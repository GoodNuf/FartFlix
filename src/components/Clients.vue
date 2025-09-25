<script setup>
import modal from './ModalChild.vue'
import RadioButton from 'primevue/radiobutton';
import Terms from './TermsPopup.vue'
import { ref } from 'vue'
import { defineExpose } from 'vue';
const showModal = ref(false)
const txt = ref('Loading...');
const plan = ref('android');
const openModal = () => {
  showModal.value = true;
  txt.value='Sign Up';
};
defineExpose({
  openModal,
});
const openClientLink = (url) => {
  window.open(url, '_blank');
};
import Popup from './Popup.vue'
const Pop = ref(null);
</script>
<template style="overflow-y: hidden;">
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 style="color: white;">Recommended Clients</h3>
      </template>
      <template #body>
          <div class="label-container">
            <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;" />
            <label for="android" :class="{active:plan==='android'}" style="margin-right: 8px;">Android</label>
            <RadioButton v-model="plan" inputId="ios" name="plan" value="ios" style="display: none;" @change="cost=6"/>
            <label for="ios" :class="{active:plan==='ios'}">iOS</label>
            <RadioButton v-model="plan" inputId="desktop" name="plan" value="desktop" style="display: none;" @change="cost=55"/>
            <label for="desktop" :class="{active:plan==='desktop'}" style="margin-left: 8px;">Desktop</label>
          </div>
          <br>
          <div id="androidClients" v-if="plan==='android'">
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 8px;"@click="openClientLink('https://play.google.com/store/apps/details?id=dev.jdtech.jellyfin&pcampaignid=web_share')">Findroid</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 8px;"@click="openClientLink('https://play.google.com/store/apps/details?id=nl.jknaapen.fladder&pcampaignid=web_share')">Fladder</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 8px;"@click="openClientLink('https://play.google.com/store/apps/details?id=com.fredrikburmester.streamyfin&pcampaignid=web_share')">Streamyfin</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='android'}" style="margin-right: 8px;"@click="openClientLink('https://play.google.com/store/apps/details?id=org.jellyfin.mobile&pcampaignid=web_share')">Jellyfin</label>
            </div>
          </div>
          <div id="iosClients" v-if="plan==='ios'">
            <div class="label-container">
              <RadioButton v-model="plan" inputId="Streamyfin" name="plan" value="Streamyfin" style="display: none;"/>
              <label for="android" :class="{active:plan==='ios'}" style="margin-right: 8px;"@click="openClientLink('https://apps.apple.com/us/app/streamyfin/id6593660679')">Streamyfin</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="Swiftfin" name="plan" value="Swiftfin" style="display: none;"/>
              <label for="android" :class="{active:plan==='ios'}" style="margin-right: 8px;"@click="openClientLink('https://apps.apple.com/ca/app/swiftfin/id1604098728')">Swiftfin</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='ios'}" style="margin-right: 8px;"@click="openClientLink('https://apps.apple.com/us/app/infuse/id1136220934?mt=8')">Infuse</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='ios'}" style="margin-right: 8px;"@click="openClientLink('https://apps.apple.com/us/app/jellyfin-mobile/id1480192618?mt=8')">Jellyfin Mobile</label>
            </div>
          </div>
          <div id="desktopClients" v-if="plan==='desktop'">
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='desktop'}" style="margin-right: 8px;"@click="openClientLink('https://github.com/DonutWare/Fladder/releases/latest')">Fladder</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='desktop'}" style="margin-right: 8px;"@click="openClientLink('https://github.com/jellyfin/jellyfin-media-player/releases/latest')">Jellyfin Media Player</label>
            </div><br>
            <div class="label-container">
              <RadioButton v-model="plan" inputId="android" name="plan" value="android" style="display: none;"/>
              <label for="android" :class="{active:plan==='desktop'}" style="margin-right: 8px;"@click="openClientLink('https://watch.fartflix.com')">Jellyfin Web</label>
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