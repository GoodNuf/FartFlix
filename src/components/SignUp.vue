<script setup>
import modal from './ModalChild.vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import Password from 'primevue/password';
import { Form } from '@primevue/forms';
import FloatLabel from 'primevue/floatlabel';
import { ref } from 'vue'
import { defineExpose } from 'vue';
import emailjs from 'emailjs-com' 
const showModal = ref(false)
const txt = ref('Loading...');
const backgroundColour = ref('#69ccc971');
const colour = ref('white');
const plan = ref('Trial');
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
const fname = ref('');
const email = ref('');
const password = ref('');
const cpassword = ref('');
const loading = ref(false);
import Popup from './Popup.vue'
const Pop = ref(null);
const openPopup = (txt,txt2) => {
  Pop.value.openModal(txt,txt2);
  closeModal();
};
const onFormSubmit = async () => {
  if (password.value !== cpassword.value) {
    openPopup('Error','Passwords do not match.');
    console.log(password.value, cpassword.value);
    return;
  }
  const form = document.getElementById('signUpForm');
  form.style.display = 'none';
  const loader = document.getElementById('spinner');
  loader.style.display = 'block';
  loading.value = true;
  const isUserCreated = await newUser();
  if (isUserCreated) {
    console.log("plan: ["+plan.value+"]");
    console.log("fname: ["+fname.value+"]");
    console.log("email: ["+email.value+"]");
    console.log("password: ["+password.value+"]");
    console.log("cpassword: ["+cpassword.value+"]");
    if(plan.value==='Trial')
    emailjs.sendForm('apple','trial',form,'rQQm5NSHaWQQ46E1J')
    else
    emailjs.sendForm('apple','pay',form,'rQQm5NSHaWQQ46E1J')
    openPopup('Success!','Your account has been created successfully! Please check your email for further instructions. ');
  } else {
    openPopup('Error','Account creation failed. Please use another email address or try again later.');
  }
  loader.style.display='none';
};
const newUser = async () => {
  try {
    const response = await fetch('https://watch.fartflix.com/Users/New', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'MediaBrowser Token="8db286654bf641c0ba4fac4934949912", Client="fartflix.com", Device="newUser", DeviceId="1", Version="1.0.0"',
      },
      body: JSON.stringify({
        Name: email.value,
        Password: password.value,
      }),
    });
    if (response.ok&&plan.value==='Trial') {
      const data = await response.json();
      console.log('Account creation successful:', data);
      await fetch(`https://watch.fartflix.com/Users/${encodeURIComponent(data.Id)}/Policy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'MediaBrowser Token="8db286654bf641c0ba4fac4934949912", Client="fartflix.com", Device="newUser", DeviceId="1", Version="1.0.0"',
        },
        body: JSON.stringify({
          EnableMediaPlayback: true,
          EnableContentDownloading: false,
          EnableLiveTvAccess: false,
          EnableLiveTvManagement: false,
          MaxActiveSessions: 2,
          AuthenticationProviderId: data.Policy.AuthenticationProviderId,
          PasswordResetProviderId: data.Policy.PasswordResetProviderId,
        }),
      });
      console.log(`NEWUSER FUNCTION [ID: ${data.Id} EMAIL: ${email.value} NAME: ${fname.value}]`);
      return true;
    }
    else if(response.ok&&plan.value==='Monthly'||plan.value==='Annual')
    {
      const data = await response.json();
      console.log('Account creation successful:', data);
      await fetch(`https://watch.fartflix.com/Users/${encodeURIComponent(data.Id)}/Policy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'MediaBrowser Token="8db286654bf641c0ba4fac4934949912", Client="fartflix.com", Device="newUser", DeviceId="1", Version="1.0.0"',
        },
        body: JSON.stringify({
          EnableMediaPlayback: false,
          EnableContentDownloading: false,
          EnableLiveTvAccess: false,
          EnableLiveTvManagement: false,
          MaxActiveSessions: 2,
          AuthenticationProviderId: data.Policy.AuthenticationProviderId,
          PasswordResetProviderId: data.Policy.PasswordResetProviderId,
        }),
      });
      console.log(`NEWUSER FUNCTION [ID: ${data.Id} EMAIL: ${email.value} NAME: ${fname.value}]`);
      return true;
    }
    else
    {
      console.error('Account creation failed:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error creating account:', error);
    return false;
  }
};
</script>
<template style="overflow-y: hidden;">
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 style="color: white;">Sign Up Form</h3>
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
            <RadioButton v-model="plan" inputId="Trial" name="plan" value="Trial" style="display: none;" @change="cost = 0"/>
            <label for="Trial" :class="{active:plan==='Trial'}" style="margin-right: 8px;">30 Day Free Trial</label>
            <RadioButton v-model="plan" inputId="Monthly" name="plan" value="Monthly" style="display: none;" @change="cost = 6"/>
            <label for="Monthly" :class="{active:plan==='Monthly'}">Monthly ($6/month)</label>
            <RadioButton v-model="plan" inputId="Annual" name="plan" value="Annual" style="display: none;" @change="cost = 55"/>
            <label for="Annual" :class="{active:plan==='Annual'}" style="margin-left: 8px;">Annual ($55/year)</label>
            <br><br>
          <FloatLabel variant="on">
            <InputText v-model="fname" type="text" name="fname" style="width:100%;"required/>
            <label style="background-color: transparent;padding: 0;color:#ffffff96" for="fname">First Name</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText v-model="email" type="email" name="email" style="width:100%;"required/>
            <label style="background-color: transparent;padding: 0;color:#ffffff96" for="email">Email</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <Password v-model="password" :feedback="false" toggleMask fluid name="password"required/>
            <label style="background-color: transparent;padding: 0;color:#ffffff96" for="password">Password</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <Password v-model="cpassword" :feedback="false" toggleMask fluid name="cpassword"required/>
            <label style="background-color: transparent;padding: 0;color:#ffffff96" for="cpassword">Confirm Password</label>
          </FloatLabel>
          <FloatLabel style="display: none;">
            <InputText v-model.number="cost" name="cost" style="width:100%;"/>
          </FloatLabel>
          <Button type="submit" severity="secondary" label="Submit" />
        </Form>
      </template>
      <template #footer>
        <button @click="showModal = false">Close</button>
      </template>
    </modal>
  </Teleport>
  <Popup ref="Pop"/>
</template>
<style>
input, button{
  /* margin:8px 0; */
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
label{
  user-select: none;
  background-color: #303030;
  padding:8px;
  border-radius: 6px;
  transition: background-color 0.2s ease,color 0.2s ease;
  display: inline-block; /* Ensure labels behave like blocks */
  white-space: nowrap; /* Prevent text from wrapping by default */
  text-overflow: ellipsis; /* Add ellipsis for overflowing text */
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