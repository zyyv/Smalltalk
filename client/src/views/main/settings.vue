<template>
  <div class="settings">
    <NavHeader title="Settings"
               subTitle='Update your profile details'>
    </NavHeader>
    <!-- <div style="padding:20px 200px">
      <Upload />
      <Upload2 v-model:src='form.img' />
      <a-button @click="click">asd</a-button>
    </div> -->
  </div>
</template>

<script lang='ts'>
import { ref, reactive, toRefs } from 'vue'
import NavHeader from '/@c/NavHeader.vue'
import Upload from '/@c/Upload/index.vue'
import Upload2 from '/@c/Upload/SingleImg.vue'

export default {
  name: 'settings',
  components: { NavHeader, Upload, Upload2 },
  setup() {
    const a = reactive({
      form: {
        img: '',
      },
    })
    function click() {
      console.log(a.form.img)
    }
    return {
      ...toRefs(a),click
    }
  },
}
</script>
<style lang='scss' scoped>
</style>
