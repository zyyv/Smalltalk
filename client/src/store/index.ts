import { createStore } from "vuex"
import user from "./modules/user"
import socket from "./modules/socket"

export default createStore({
  modules: {
    user, socket
  },
  strict: true
})