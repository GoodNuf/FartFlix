<script setup>
import WelcomeItem from './WelcomeItem.vue'
import PlansIcon from './icons/IconPlans.vue'
import CatalogIcon from './icons/IconCatalog.vue'
import GetStartedIcon from './icons/IconGetStarted.vue'
import MemberIcon from './icons/IconMember.vue'
import Popup from './Popup.vue'
import Login from './Login.vue'
import Catalog from './Catalog.vue'
import Terms from './TermsPopup.vue'
import Status from './ServerStatus.vue'
import { ref } from 'vue';
const Statu = ref(null);
const openStatus = () => {
  Statu.value.openModal();
};
const Log = ref(null);
const openLog = () => {
  Log.value.openModal();
};
const Cat = ref(null);
const openMovies = () => {
  Cat.value.Movies();
};
const openShows = () => {
  Cat.value.TV();
};
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
</script>
<template>
  <WelcomeItem>
    <template #icon>
      <PlansIcon />
    </template>
    <template #heading>Plans</template>
    <h4 style="color:white;">FartFlix<span style="color:#69CCC9;">+</span> Monthly</h4>(Access to 900+ movies & 6,000+ episodes of TV + 1 free monthly request): $<span style="color:#69CCC9;">6</span>/month<sup>1</sup></br>
    <h4 style="color:white;">FartFlix<span style="color:#69CCC9;">+</span> Annual</h4>(Access to 900+ movies & 6,000+ episodes of TV + 1 free monthly request): $<span style="color:#69CCC9;">55</span>/year<sup>1</sup>
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
    <a href="#" @click.prevent="openSignUp" style="color: #69CCC9;">Sign up and start your 30 day free trial</a><sup>2</sup><span> | </span><a href="#" @click.prevent='openPopup("Terms and Conditions","h1","b1","h2","b2","h3","b3","h4","b4","h5","b5","h6","b6")'>Terms and Conditions</a>
    <!-- <a href="#" @click.prevent="openSignUp" style="color: #69CCC9;">Sign up and start your 30 day free trial</a><sup>2</sup><span> | </span><a style="color: #818181;" href="#" @click.prevent='openPopup("Terms and Conditions","h1","b1","h2","b2","h3","b3","h4","b4","h5","b5","h6","b6")'>Terms and Conditions</a> -->
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <MemberIcon />
    </template>
    <template #heading>Already a FartFlix+ Member?</template>
    <a href="https://watch.fartflix.com" target="_blank" rel="noopener">Start streaming</a><span> | </span>
    <a href="https://request.fartflix.com" target="_blank" rel="noopener">Make a request</a><span> | </span>
    <a href="#" @click.prevent="openStatus" style="color: #69CCC9;">Server status</a><span> | </span>
    <a href="#" @click.prevent="openLog" style="color: #818181;">Manage account</a>
    
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
</template>