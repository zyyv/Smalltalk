<template>
  <a-upload v-model:fileList="list"
            :multiple="false"
            :show-upload-list="false"
            :action="action"
            :data="data"
            :before-upload="beforeUpload"
            @change="handleChange">
    <slot>
      <a-button>
        <upload-outlined /> Click to Upload
      </a-button>
    </slot>
  </a-upload>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { httpGet } from '@/api/axios'
import { random } from '@/utils'
import { message } from 'ant-design-vue'
function useUpload(ctx: any) {
  const state = reactive({
    action:
      window.location.protocol === 'https:'
        ? 'https://upload-z2.qiniup.com'
        : 'http://upload-z2.qiniup.com',
    list: [],
    loading: false,
    data: {
      token: '',
      key: ''
    },
    domainUrl: ''
  })
  const handleChange = ({ file, fileList }: any) => {
    if (file.status === 'uploading') {
      state.loading = true
      state.list = fileList
    }
    if (file.status === 'done') {
      state.loading = false
      state.list = fileList
      ctx.emit('update:src', `${state.domainUrl}${state.data.key}`)
    }
    if (file.status === 'error') {
      state.loading = false
    }
  }
  const beforeUpload = (file: File, fileList: File[]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG file!')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
      return false
    }
    const key = `${+new Date()}-${random(9999, 1000)}${getSuffix(file.name)}`
    return httpGet('/qiniu/token')
      .then((res) => {
        state.domainUrl = res.data.domainUrl
        state.data.token = res.data.token
        state.data.key = key
        Promise.resolve(true)
      })
      .catch(() => {
        Promise.reject(false)
      })
  }

  return { ...toRefs(state), handleChange, beforeUpload }
}
/** 获取文件后缀名 */
function getSuffix(filename: string) {
  let suffix = ''
  const lastIndex = filename.lastIndexOf('.')
  if (lastIndex >= 0) {
    suffix = filename.substring(lastIndex)
  }
  return suffix
}
export default defineComponent({
  name: 'uploadPrimary',
  components: { UploadOutlined },
  setup(props, ctx) {
    return {
      ...useUpload(ctx)
    }
  }
})
</script>

<style lang='scss' scoped>
</style>