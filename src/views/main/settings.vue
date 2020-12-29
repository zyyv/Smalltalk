<template>
  <div class="settings">
    <NavHeader title="Settings"
               subTitle='Update your profile details'>
    </NavHeader>
    <!-- <div style="padding:20px 200px">
      <Upload />
      
      <a-button @click="click">asd</a-button>
    </div> -->
    <Upload2 v-model:src='form.img' />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import NavHeader from '/@c/NavHeader.vue'
import Upload from '/@c/Upload/index.vue'
import Upload2 from '/@c/Upload/SingleImg.vue'

export default defineComponent({
  name: 'settings',
  components: { NavHeader, Upload, Upload2 },
  setup() {
    const a = reactive({
      form: {
        img: ''
      }
    })
    function click() {
      console.log(a.form.img)
    }
    return {
      ...toRefs(a),
      click
    }
  }
})
</script>
<style lang='scss' scoped>
</style>
