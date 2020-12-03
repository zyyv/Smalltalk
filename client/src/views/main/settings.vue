<template>
  <div class="settings">
    <NavHeader title="Settings"
               subTitle='Update your profile details'>
    </NavHeader>
    <div style="padding:20px 200px">
      <Upload />

    </div>
  </div>
</template>

<script lang='ts'>
import { ref, reactive } from 'vue'
import NavHeader from '/@c/NavHeader.vue'
import Upload from '/@c/Upload/index.vue'

export default {
  name: 'settings',
  components: { NavHeader, Upload },
  setup() {
    return {}
  },
}
</script>
<style lang='scss' scoped>
</style>
