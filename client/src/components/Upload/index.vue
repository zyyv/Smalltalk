<template>
  <a-upload-dragger list-type="picture"
                    :multiple="true"
                    :fileList="list"
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
import { ref, reactive, toRefs, watchEffect } from 'vue'
import { message } from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import { httpGet } from '../../api/axios'
import { random } from '/@/utils'
// import * as qiniu from 'qiniu-js'

function useUpload() {
  const state = reactive({
    action:
      window.location.protocol === 'https:'
        ? 'https://upload-z2.qiniup.com'
        : 'http://upload-z2.qiniup.com',
    list: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url:
      //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
      // {
      //   uid: '-5',
      //   name: 'image.png',
      //   status: 'error',
      // },
    ],
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
    const { action, list } = useUpload()
    const formData = reactive({
      token: '',
      key: '',
    })
    const domainUrl = ref('')
    const handleChange = ({ file, fileList }: any) => {
      const status = file.status
      if (file.status === 'uploading') {
        list.value = fileList
      }
      if (file.status === 'done') {
        list.value = fileList
      }
      if (file.status === 'error') {
        console.log(status, file, fileList)
      }
    }
    const beforeUpload = (file: File, fileList: File[]) => {
      const key = `${+new Date()}-${random(9999, 1000)}${getSuffix(file.name)}`
      return httpGet('/qiniu/token')
        .then((res) => {
          domainUrl.value = res.data.domainUrl
          formData.token = res.data.token
          formData.key = key
          Promise.resolve(true)
        })
        .catch(() => {
          Promise.reject(false)
        })
    }
    const handleRemove = (file: any) => {
      const index = list.value.indexOf(file)
      list.value.splice(index, 1)
      return true
    }
    return {
      formData,
      handleChange,
      action,
      list,
      beforeUpload,
      handleRemove,
    }
  },
}
</script>
<style lang='scss' scoped>
</style>
