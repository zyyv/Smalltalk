<template>
  <a-upload v-model:fileList="list"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="action"
            :data="data"
            :before-upload="beforeUpload"
            @change="handleChange">
    <div v-if="src"
         :style="{'background-image': `url(${src})`}"
         class="avatar-bg"></div>
    <div v-else>
      <loading-outlined v-if="loading" />
      <plus-outlined v-else />
      <div class="ant-upload-text">{{tips}}</div>
    </div>
  </a-upload>
</template>

<script lang='ts'>
import { ref, reactive, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import {
  InboxOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons-vue'
import { httpGet } from '/@/api/axios'
import { random } from '/@/utils'

function useUpload(props, ctx) {
  const state = reactive({
    action:
      window.location.protocol === 'https:'
        ? 'https://upload-z2.qiniup.com'
        : 'http://upload-z2.qiniup.com',
    list: [],
    loading: false,
    data: {
      token: '',
      key: '',
    },
    domainUrl: '',
  })
  const handleChange = ({ file, fileList }) => {
    const status = file.status
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
  const beforeUpload = (file, fileList) => {
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

export default {
  name: 'Upload',
  components: { InboxOutlined, PlusOutlined, LoadingOutlined },
  props: {
    src: String,
    tips: {
      type: String,
      default: 'Upload',
    },
  },
  setup(props, ctx) {
    return {
      ...useUpload(props, ctx),
    }
  },
}
</script>
<style lang='scss' scoped>
.avatar-bg {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
</style>
