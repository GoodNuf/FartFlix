<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<!-- <template>
  <div class="greetings">
    <div class="title-container" style="user-select:none;">
        <h1 class="title">FartFlix<span>+</span><i style="font-size: small;">An Upcyclr Project</i></h1>
    </div>
  </div>
</template> -->

<style scoped>
h1 {
  font-weight: bold;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
i{
  font-weight: bold;;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
