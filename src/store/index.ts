import { createStore } from "vuex"
import user from "./modules/user"
import socket from "./modules/socket"
import { getDevice, setDevice } from "../utils/auth"

export default createStore({
  modules: {
    user, socket
  },
  state: {
    device: getDevice() || 'pc' // 默认pc端打开
  },
  mutations: {
    setDeivce(state, device) {
      state.device = device
      setDevice(device)
    }
  },
  actions: {},
  strict: true
})