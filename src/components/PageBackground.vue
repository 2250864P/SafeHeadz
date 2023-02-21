<!-- Universal background for the application -->
<template>
  <div>
    <img src="../assets/Website_Logo.png" alt="Background" class="background-image">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageBackground'
}
</script>

<style scoped>
.background-image {
  opacity: 0.3;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.container {
  padding-top: 1px;
  padding-bottom: 1px;
}
</style>

