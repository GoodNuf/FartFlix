<template>
  <div class="bottom-middle">
    <a>
      <slot name="txt"></slot>
    </a>
  </div>
</template>

<style scoped>
.bottom-middle {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
</style>