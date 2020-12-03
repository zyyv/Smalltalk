<template>
  <div class="sidebar">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "Sidebar",
  components: {},
  setup() {
    return {};
  },
};
</script>
<style lang='scss' scoped>
.sidebar {
  order: 2;
  background: #f5f6fa;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s;
  &::-webkit-scrollbar {
    display: none;
  }
}
@media (min-width: 769px) {
  .sidebar {
    width: 42rem;
    flex-grow: 0;
  }
}
@media (max-width: 768px) {
  .sidebar {
    order: 0;
    background: #f5f6fa;
    flex-grow: 1;
    transition: visibility 0.4s ease, -webkit-transform 0.4s ease,
      transform 0.4s ease;
  }
}
</style>
