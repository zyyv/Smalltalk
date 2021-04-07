<template>
  <router-view />
</template>

<script lang="ts">
import { getDeviceType } from './utils'
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    const store = useStore()
    store.commit('setDeivce', getDeviceType())
  }
}
</script>
