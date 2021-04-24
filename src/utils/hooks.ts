import { inject } from "vue"

export function useSocket() {
    const socket = inject('socket') as SocketIOClient.Socket
    return socket
  }