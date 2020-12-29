<template>
  <div class="update">
    <div class="content">
      <h2 class="title gradient-text">您需要完成以下几步设置，开始使用</h2>
      <a-form layout="vertical">
        <a-form-item>
          <Avatar v-model:src="form.avatar"
                  tips="Avatar" />
        </a-form-item>
        <a-form-item label="Name"
                     v-bind="validateInfos.name">
          <a-input class="info-input"
                   @blur="validate('name')"
                   v-model:value="form.name"
                   placeholder="Please Enter your Name" />
        </a-form-item>
        <!-- <a-form-item label="Pwd"
                     v-bind="validateInfos.pwd">
          <a-input class="info-input"
                   @blur="validate('pwd')"
                   v-model:value="form.pwd"
                   placeholder="Please Enter your Pwd" />
        </a-form-item> -->
        <a-form-item label="Sign">
          <a-input class="info-input"
                   v-model:value="form.sign"
                   placeholder="Please Enter your Sign" />
        </a-form-item>
        <a-form-item label="Gender">
          <a-radio-group style="padding:1rem 1.25rem"
                         v-model:value="form.gender">
            <a-radio value="male">男</a-radio>
            <a-radio value="female">女</a-radio>
            <a-radio value="unknow">保密</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item style="margin-bottom:0;">
          <a-button @click.prevent="Update"
                    class="info-button"
                    block>完成设置
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRaw, toRefs, defineComponent } from 'vue'
import { useForm } from '@ant-design-vue/use'
import { message } from 'ant-design-vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { UserData } from '/@/api'
import type { Result } from '/@/api/type'
import Avatar from '/@c/Upload/SingleImg.vue'

interface Form {
  avatar: string
  name: string
  sign: string
  gender: 'unknow' | 'male' | 'female'
}
function useUpdate() {
  interface State {
    form: Form
    rules: object
  }
  const state = reactive<State>({
    form: {
      avatar: '',
      name: '',
      sign: '',
      gender: 'unknow'
    },
    rules: {
      name: [
        {
          required: true,
          message: 'Please input name'
        }
      ]
    }
  })
  const { validate, validateInfos } = useForm(state.form, state.rules)

  interface Func {
    (form: Form): void
  }
  const handleSubmit = (callback: Func) => {
    if (!state.form.avatar) {
      message.error('请上传头像')
      return
    }
    validate().then(() => {
      callback(toRaw(state.form))
    })
  }
  return { ...toRefs(state), validate, validateInfos, handleSubmit }
}

function useAvatar() {
  const state = reactive({
    fileList: [],
    loading: false
  })

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      state.loading = true
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (form.avatar) => {
      //   this.form.avatar = form.avatar
      //   this.loading = false
      // })
    }
    if (info.file.status === 'error') {
      state.loading = false
    }
  }
  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  return { ...toRefs(state), handleChange, beforeUpload }
}

export default defineComponent({
  name: 'update',
  components: { PlusOutlined, LoadingOutlined, Avatar },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { handleSubmit, ...rest } = useUpdate()
    const Update = () => {
      handleSubmit((form: object) => {
        UserData.update(form).then((res: Result) => {
          store.commit('user/setUserInfo', res.data)
          message.success('更新成功')
          setTimeout(() => {
            router.replace('/')
          }, 1500)
        })
      })
    }

    return {
      Update,
      ...useAvatar(),
      ...rest
    }
  }
})
</script>
<style lang="scss" scoped>
.update {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  > .content {
    > .title {
      text-align: center;
      font-weight: 700;
      margin-bottom: 2rem;
    }
  }
}
.avatar-uploader {
  display: inline-flex;
  justify-content: center;
  .ant-upload {
    border-radius: 50%;
  }
}
.avatar-bg {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.info-input {
  height: calc(1.6em + 2.5rem + 2px);
  padding: 0.9375rem 1.25rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.6;
  color: #7f808c;
  background-clip: padding-box;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #edeef6;
  transition: border-color 0.35s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  outline: none;
  &:focus {
    border-color: #ccc;
    outline: none;
    box-shadow: none;
  }
}
.info-button {
  margin-top: 1rem;
  padding: 1.2rem;
  height: auto;
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: none;
  font-weight: 600;
  font-size: 14px;
  border: none;
  overflow: hidden;
  background: transparent;
  color: var(--white);
  transition: background 0.4s ease-in-out, border-color 0.4s ease-in-out,
    color 0.4s ease-in-out;
  &::before {
    content: '';
    display: block;
    opacity: 0;
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    top: 2px;
    left: 2px;
    z-index: -1;
    transform: translate3d(0, 0, 0);
    transition: background 0.4s ease-in-out;
  }
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    z-index: -3;
    background: transparent;
    background: linear-gradient(
      264.51deg,
      #ffe580 4.38%,
      #ff7571 11.51%,
      #ff7270 25.06%,
      #ea5dad 36.04%,
      #c2a0fd 47.63%,
      #9867f0 59.03%,
      #42ba96 69.96%,
      #20c997 83.74%,
      #b2f4b6 95.62%
    );
    background-position: 58% 50%;
    background-size: 500%;
    animation: gradient-shift 30s ease infinite;
  }
  &:hover::before {
    background: transparent;
  }
}

@media (max-width: 1199px) {
  .content {
    width: 85vw;
  }
}
@media (min-width: 1200px) {
  .content {
    width: 320px;
  }
}
</style>
