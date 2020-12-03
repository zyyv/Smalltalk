<template>
  <div class="layout">
    <Navbar />
    <Sidebar />
    <Main />
  </div>
</template>

<script>
import Main from './Main.vue'
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
export default {
  name: 'layout',
  components: { Main, Navbar, Sidebar },
}
</script>
<style lang='scss' scoped>
.layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
}
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
