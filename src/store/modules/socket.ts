import type { Module } from "vuex"

interface State {
    test: string
}

const socket: Module<State, any> = {
    namespaced: true,
    state: {
        test: ''
    },
    mutations: {
        SOCKET_test(state, data) {
            console.log(data)
            state.test = data
        }
    },
    actions: {

    }
}

export default socket