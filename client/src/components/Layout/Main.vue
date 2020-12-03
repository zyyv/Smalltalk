<template>
  <div class="main">
    <router-view name="main"></router-view>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Main'
}
</script>
<style lang='scss' scoped>
.main {
  overflow: hidden;
  height: 100vh;
  order: 3;
  flex: 1;
}
@media (max-width: 768px) {
  .main {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1020;
    visibility: hidden;
    transform: translateX(100%);
    transition: visibility 0.4s ease, -webkit-transform 0.4s ease,
      transform 0.4s ease;
  }
}
</style>
