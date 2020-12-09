<template>
  <div class="login">
    <div class="wrapper">
      <h1 class="title gradient-text">Sign in</h1>
      <p class="desc gradient-text">Welcome to the SmallTalk web-client.</p>
      <a-form layout="vertical">
        <a-form-item>
          <a-input class="f-input"
                   :maxlength="11"
                   v-model:value="form.phone"
                   placeholder="Enter your phone +86" />
        </a-form-item>
        <transition name="fade"
                    mode="out-in">
          <a-form-item key="pwd"
                       v-if="form.type === 'II'">
            <a-input-password class="f-pwd"
                              @pressEnter="Submit"
                              v-model:value="form.pwd"
                              placeholder="Enter your password" />
          </a-form-item>
          <a-form-item key="code"
                       v-else>
            <a-input class="f-smsCode"
                     :maxlength="4"
                     @pressEnter="Submit"
                     placeholder="Enter your smscode"
                     v-model:value="form.code">
              <template #suffix>
                <a-button @click="GetSmsCode"><span class="gradient-text">{{ codeBtnText }}</span></a-button>
              </template>
            </a-input>
          </a-form-item>
        </transition>
        <a-form-item>
          <div class="btns">
            <a-checkbox v-model:checked="form.remember"> Remember me </a-checkbox>
            <div @click="handleTypeChange"
                 class="exchange">
              <SwapOutlined />
            </div>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button :loading="loading"
                    @click.prevent="Submit"
                    class="gradient-button"
                    block>Sign in
          </a-button>
        </a-form-item>
      </a-form>
      <p class="msg">© 2020 Chris. All rights reserved.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRaw, toRefs, onBeforeUnmount, toRef, Ref } from 'vue'
import { SwapOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { UserData } from '/@/api'
import { throttle } from '/@/utils'
import { storageClear } from '/@/utils/auth'
import type { Result } from '/@/api/type'
import { Login } from '../../api/type'

const phoneReg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/

function useSmscode(num: number, phone: Ref<string>) {
  const time = ref(num)
  const codeBtnText = ref('Get Smscode')
  const getSmsCode = () => {
    codeBtnText.value = `Get Smscode( ${time.value}s )`
    let timer: any = setInterval(() => {
      time.value--
      if (time.value > 0) {
        codeBtnText.value = `Get Smscode( ${time.value}s )`
      } else {
        codeBtnText.value = 'Get Smscode'
        time.value = num
        clearInterval(timer)
        timer = null
      }
    }, 1000)
    UserData.sendSms({ phone: phone.value }).then((res: Result) => {
      message.info(res.data.text, 5)
    })
  }
  const throttleGetSmsCode = throttle(getSmsCode, num * 1000)
  const GetCode = () => {
    if (!phoneReg.test(phone.value)) {
      message.error('请输入正确的手机号')
      return
    }
    throttleGetSmsCode()
  }
  return {
    GetSmsCode: GetCode,
    codeBtnText,
  }
}

function useLogin() {
  const form = reactive({
    phone: '',
    pwd: '',
    remember: true,
    code: '',
    type: 'I', // I -> smscode  II -> pwd
  })
  const loading = ref(false)
  const handleTypeChange = () => {
    form.type = form.type === 'I' ? 'II' : 'I'
  }
  const handleSubmit = (callback: Function) => {
    loading.value = true
    if (!phoneReg.test(form.phone)) {
      message.error('请输入正确的手机号')
      loading.value = false
      return
    }
    if (form.type === 'I') {
      // smscode
      if (!form.code) {
        loading.value = false
        message.error('请输入验证码')
        return
      }
    } else {
      // pwd
      if (!form.pwd) {
        loading.value = false
        message.error('请输入密码')
        return
      }
    }
    callback(toRaw(form)).finally(() => (loading.value = false))
  }
  return {
    form,
    loading,
    handleTypeChange,
    handleSubmit,
  }
}

export default {
  name: 'login',
  components: { SwapOutlined },
  setup() {
    // 挂载和卸载之前都清理一下
    storageClear()
    onBeforeUnmount(() => {
      sessionStorage.removeItem('smsCode')
    })
    const store = useStore()
    const { form, handleSubmit, ...rest } = useLogin()
    const login = async (form: Login) => store.dispatch('user/login', form)
    const Submit = () => {
      handleSubmit(login)
    }

    return {
      form,
      Submit,
      ...rest,
      ...useSmscode(30, toRef(form, 'phone')),
    }
  },
}
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  .wrapper {
    transition: all 0.35s;
    .title,
    .desc,
    .msg {
      text-align: center;
    }
    .desc {
      margin-bottom: 20px;
    }
    .desc,
    .msg {
      font-size: 1.5rem;
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .exchange {
        padding: 0.4rem 1.3rem;
        font-size: 1.5rem;
        // padding: 0rem 1rem;
      }
    }
  }
}

@media (max-width: 1199px) {
  .wrapper {
    width: 85vw;
  }
}
@media (min-width: 1200px) {
  .wrapper {
    width: 320px;
  }
}
</style>
