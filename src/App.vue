<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { getDeviceType } from './utils'
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    store.commit('setDeivce', getDeviceType())
  }
})
</script>
