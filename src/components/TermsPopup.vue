<script setup>
import modal from './ModalChild.vue'
import { ref } from 'vue'
import { defineExpose } from 'vue';
const showModal = ref(false)
const header = ref('Loading...');
const body1 = ref('Loading...');
const body2 = ref('Loading...');
const body3 = ref('Loading...');
const body4 = ref('Loading...');
const body5 = ref('Loading...');
const body6 = ref('Loading...');
const header1 = ref('Loading...');
const header2 = ref('Loading...');
const header3 = ref('Loading...');
const header4 = ref('Loading...');
const header5 = ref('Loading...');
const header6 = ref('Loading...');
const backgroundColour = ref('#69ccc971');
const colour = ref('white');
const openModal = () => {
  showModal.value = true;
};
const Pop = ref(null);
const openPopup = () => {
  Pop.value.openModal();
  closeModal();
};
defineExpose({
  openModal,
});
</script>
<template>
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3 style="color: white;">Terms & Conditions</h3>
      </template>
      <template #body>
        <h2 style="font-weight:bold">1. Prices & Payment</h2>
        <h3>All pricing is subject to change at any time, without prior notice, and at the sole discretion of the service operator. Listed prices do not include any applicable fees associated with individual media requests. Full HD 1080p requests are billed at $1 each; 4K 2160p requests are billed at $2 each; TV season requests are billed between $2 and $4 each, depending on availability and size. All media requests must be prepaid and are non-refundable unless otherwise explicitly stated herein. Free monthly request allocations do not roll over from month to month and have no cash value. Free trial members are expressly prohibited from submitting free media requests or downloading media content.</h3>
        <h2 style="font-weight:bold">2. Free Trial Terms & Subscription</h2>
        <h3>Free trial eligibility is strictly limited to new subscribers only. Submission of a sign-up request does not guarantee approval for a free trial. All trial requests are subject to manual review. Applicants must submit a valid and unique email address, provide a brief explanation for why they are requesting a trial, and may be required to provide legal or government-issued identification for verification purposes. Duplicate submissions, incomplete forms, or unverifiable information may result in rejection without notice. Free trial accounts are non-transferable, non-shareable, and must not be used by, or on behalf of, any third party. Each user is permitted only one free trial; multiple trials, even under different names or emails, are strictly prohibited. Free trial accounts found to be associated with previously banned or suspended accounts may be automatically denied or revoked. The trial period begins only upon approval, not upon submission. Approved trial periods last for thirty (30) calendar days, unless terminated earlier at the sole discretion of the service operator. The operator reserves the absolute right to deny, suspend, revoke, or delete trial accounts at any time, with or without cause or notice. Free trial members are not eligible for free media requests, cannot download media, and may have limited access to certain features, services, or content. Free trial accounts may not be used for archival, scraping, commercial use, or redistribution of content in any form. If a FartFlix+ subscription is purchased during the trial period, the remaining portion of the trial will end immediately and the new billing period will begin on the purchase date. Unverified, inactive, unpaid, or expired accounts — including free trial accounts — may be deleted or removed at any time following 30 consecutive days of inactivity.</h3>
        <h2 style="font-weight:bold">3. Media Requests & Fulfillment</h2>
        <h3>Requests for TV shows may be submitted either by season or by episode, subject to availability. Media quality, including but not limited to resolution, encoding, compression artifacts, or file size, is not guaranteed and is provided on an as is basis. Specific quality attributes cannot be requested or guaranteed. Fulfillment of a request may take up to two (2) business days. If a request is not fulfilled within two (2) days of payment confirmation, the requester may submit a written claim for a full refund. Claims relating to video, audio, or service quality must be submitted within two (2) calendar days of fulfillment and are evaluated individually; approval of such refund claims is not guaranteed and is granted solely at the operator’s discretion. The service operator reserves the unrestricted right to deny, suspend, limit, revoke, or cancel any individual media request, or any user account associated with a request, without notice and without obligation to disclose reasoning.</h3>
        <h2 style="font-weight:bold">4. Account & Service Management</h2>
        <h3>Duplicate or fraudulent accounts created by the same individual may be deleted without notice. Unpaid or expired accounts that remain inactive for thirty (30) or more consecutive calendar days may be suspended, terminated, or deleted at the operator’s sole discretion. The availability, quality, catalog, and features of the media library are subject to change at any time without obligation to provide notice or retain prior offerings. Continued use of the service after such changes constitutes acceptance of the new terms.</h3>
        <h2 style="font-weight:bold">5. Disclaimer of Warranties & Limitation of Liability</h2>
        <h3>Use of the service is undertaken at the user's sole risk. The service is provided on an as is, where is, and as available basis without warranties of any kind, express or implied. To the fullest extent permissible under applicable law, the operator expressly disclaims all warranties, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement. The operator does not warrant that the service will be uninterrupted, error-free, secure, or free from viruses or other harmful components. Under no circumstances shall the operator be liable for any direct, indirect, incidental, consequential, special, punitive, or exemplary damages arising out of or in connection with your access to or use of, or inability to access or use, the service, even if advised of the possibility of such damages.</h3>
        <h2 style="font-weight:bold">6. Modification of Terms</h2>
        <h3>We reserve the right to update, modify, or otherwise alter these Terms of Service at any time, without prior notice. Your continued use of the service following any changes constitutes your acceptance of the revised terms.
          Use of this service constitutes agreement to our Terms of Service. Service provided 'as-is' with no warranties expressed or implied.</h3>
      </template>
      <template #footer>
        <button @click="showModal = false" style="background-color:black;">Close</button>
      </template>
    </modal>
  </Teleport>
</template>