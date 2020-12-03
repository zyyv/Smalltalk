<template>
  <a-upload-dragger name="file"
                    :multiple="false"
                    :fileList="true"
                    :action="action"
                    :data="formData"
                    :beforeUpload="beforeUpload"
                    :remove="handleRemove"
                    @change="handleChange">
    <p class="ant-upload-drag-icon">
      <inbox-outlined />
    </p>
    <p class="ant-upload-text">
      Click or drag file to this area to upload
    </p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </a-upload-dragger>
</template>

<script lang='ts'>
import { ref, reactive, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import { httpGet } from '../../api/axios'
import { random } from '/@/utils'
// import * as qiniu from 'qiniu-js'

function useUpload() {
  const state = reactive({
    action: 'http://upload-z2.qiniup.com',
    fileList: [],
  })
  return {
    ...toRefs(state),
  }
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
  components: { InboxOutlined },
  setup() {
    const { action, fileList } = useUpload()
    const formData = reactive({
      token: '',
      key: '',
    })
    const handleChange = (info) => {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
    const beforeUpload = (file, fileList) => {
      console.log(file, fileList)

      // const isPNG = file.type === 'image/png'
      // const isJPEG = file.type === 'image/jpeg'
      // const isJPG = file.type === 'image/jpg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isPNG && !isJPEG && !isJPG) {
      //   message.error('上传头像图片只能是 jpg、png、jpeg 格式!')
      //   return false
      // }
      // if (!isLt2M) {
      //   message.error('上传头像图片大小不能超过 2MB!')
      //   return false
      // }
      const key = `${+new Date()}-${random(9999, 1000)}${getSuffix(file.name)}`

      return httpGet('/qiniu/token')
        .then((res) => {
          formData.token = res.data.token
          formData.key = key
          Promise.resolve(true)
        })
        .catch((err) => {
          Promise.reject(false)
        })
    }
    const handleRemove = (file) => {
      return true
    }
    return {
      formData,
      handleChange,
      action,
      fileList,
      beforeUpload,
      handleRemove,
    }
  },
}
</script>
<style lang='scss' scoped>
</style>
