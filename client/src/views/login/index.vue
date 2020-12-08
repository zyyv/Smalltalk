<template>
  <div class="login">
    <div class="wrapper">
      <h1 class="title gradient-text">Sign in</h1>
      <p class="desc gradient-text">Welcome to the SmallTalk web-client.</p>
      <a-form layout="vertical">
        <a-form-item>
          <a-input class="f-input"
                   :maxlength="11"
                   v-model:value="phone"
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
                <a-button @click="getSmsCode"><span class="gradient-text">{{ codeBtnText }}</span></a-button>
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
  // todo 获取验证码
  // const throttleGetSmsCode = throttle(() => {
  //   const phoneRep = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
  //   if (!phoneRep.test(form.value.phone)) {
  //     message.error('请输入正确的手机号')
  //     return
  //   }
  //   getSmsCode()
  // }, num * 1000)
  // console.log(phone)
  const throttleGetSmsCode = throttle(getSmsCode, num * 1000)

  return {
    getSmsCode: throttleGetSmsCode,
    codeBtnText,
  }
}

function useLogin() {
  const state = reactive({
    form: {
      phone: '',
      pwd: '',
      remember: true,
      code: '',
      type: 'I', // I -> smscode  II -> pwd
    },
    loading: false,
  })
  const handleTypeChange = () => {
    state.form.type = state.form.type === 'I' ? 'II' : 'I'
  }
  const handleSubmit = (callback: Function) => {
    state.loading = true
    const phoneRep = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
    if (!phoneRep.test(state.form.phone)) {
      message.error('请输入正确的手机号')
      state.loading = false
      return
    }
    if (state.form.type === 'I') {
      // smscode
      if (!state.form.code) {
        state.loading = false
        message.error('请输入验证码')
        return
      }
    } else {
      // pwd
      if (!state.form.pwd) {
        state.loading = false
        message.error('请输入密码')
        return
      }
    }
    callback(toRaw(state.form))
      .then(() => {
        state.loading = false
      })
      .catch((err: Error) => {
        console.log(err)
        state.loading = false
      })
  }
  return {
    ...toRefs(state),
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
    const { form, loading, handleTypeChange, handleSubmit } = useLogin()
    const phone = toRef(form.value, 'phone')
    const { getSmsCode, codeBtnText } = useSmscode(30, phone)
    const login = async (form: object) => store.dispatch('user/login', form)
    const Submit = () => {
      handleSubmit(login)
    }

    return {
      form,
      phone,
      Submit,
      loading,
      handleTypeChange,
      codeBtnText,
      getSmsCode,
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
