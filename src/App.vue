<template>
  <router-view />
</template>

<script lang="ts" setup>
import { getDeviceType } from './utils'
import { useStore } from 'vuex'

const store = useStore()
store.commit('setDeivce', getDeviceType())
</script>
