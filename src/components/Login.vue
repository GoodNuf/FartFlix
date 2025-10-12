<script setup>
import modal from './ModalChild.vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import Password from 'primevue/password';
import { Form } from '@primevue/forms';
import FloatLabel from 'primevue/floatlabel';
import Checkbox from 'primevue/checkbox';
import Terms from './TermsPopup.vue'
import CheckboxGroup from 'primevue/checkboxgroup';
import { ref } from 'vue'
import { defineExpose } from 'vue';
import emailjs from 'emailjs-com' 
const showModal = ref(false)
const txt = ref('Loading...');
const openModal = () => {
  showModal.value = true;
  txt.value='Sign Up';
};
const closeModal = () => {
  showModal.value = false;
};
const initialValues = {
  fname: '',
  email: '',
  password: '',
  cpassword: '',
  plan: 'Trial',
};
defineExpose({
  openModal,
});
const email = ref('');
const password = ref('');
import Popup from './Popup.vue'
const Pop = ref(null);
const openPopup = (txt,txt2) => {
  Pop.value.openModal(txt,txt2);
  closeModal();
};
import Services from './Services.vue'
const Service = ref(null);
const openServices = (txt) => {
  Service.value.openModal();
  closeModal();
};
const onFormSubmit = async () => {
  const user = await login();
  // console.log(user);
  // console.log(user.User.Policy.EnableMediaPlayback);
  if (!user||!user.User||!user.User.Policy)
  openPopup('Error','Invalid username or password. Please try again.');
  else if (user.User.Policy.EnableMediaPlayback===true)
    openServices();
  else if (user.User.Policy.EnableMediaPlayback===false)
    openPopup('Error','Your account is not activated. Please complete your account activation or contact support.');
  else
    openPopup('Error','Invalid username or password. Please try again.');
};
const login = async () => {
  try {
    const response = await fetch('https://watch.fartflix.com/Users/AuthenticateByName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'MediaBrowser Token="8db286654bf641c0ba4fac4934949912", Client="fartflix.com", Device="login", DeviceId="1", Version="1.0.0"',
      },
      body: JSON.stringify({
        Username: email.value,
        Pw: password.value,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    return false;
  }
};
</script>
<template style="overflow-y: hidden;">
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 style="color: white;">Login</h3>
      </template>
      <template #body>
        <div id="spinner" style="display:none;">
          <div class="spring-spinner" style="margin: 0 auto;">
            <div class="spring-spinner-part top">
              <div class="spring-spinner-rotator"></div>
            </div>
            <div class="spring-spinner-part bottom" style="margin: 0 auto;">
              <div class="spring-spinner-rotator"></div>
            </div>
          </div>
        </div>
        <Form id="signUpForm" v-slot="{values}" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit(values)" class="flex flex-col gap-4">
          <FloatLabel variant="on">
            <InputText v-model="email" type="text" name="email" style="width:100%;"required/>
            <label style="background-color: transparent;padding: 0;color:#ffffff96" for="email">Email</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <Password v-model="password" :feedback="false" toggleMask fluid name="password"required/>
            <label style="background-color: transparent;padding: 0;color:#ffffff96" for="password">Password</label>
          </FloatLabel>
          <Button type="submit" severity="secondary" label="Login" />
        </Form>
      </template>
      <template #footer>
        <button @click="showModal = false">Close</button>
      </template>
    </modal>
  </Teleport>
  <Popup ref="Pop"/>
  <Terms ref="PopT"/>
  <Services ref="Service"/>
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