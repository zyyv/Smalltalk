<template>
  <div class="chating">
    <NavHeader class="head"
               :title="name || 'Chris'" />
    <div class="body">
      <div class="messageList">
        <template v-for="i in 10"
                  :key="i">
          <div class="messageItem notme">
            <div>
              <Avatar class="avatar"
                      :online="false"
                      src="http://ql61yf5hl.hn-bkt.clouddn.com/1608021828527-8669.jfif" />
            </div>
            <div class="messageBody" v-html='parsingEmoji("明天约吗？[奸笑]")'></div>
          </div>
          <div class="messageItem me">
            <div>
              <Avatar class="avatar"
                      :online="false"
                      src="http://ql61yf5hl.hn-bkt.clouddn.com/1608021828527-8669.jfif" />
            </div>
            <div class="messageBody" v-html='parsingEmoji("明天约吗？[奸笑]")'></div>
          </div>
        </template>

      </div>
    </div>
    <div class="foot">
      <div class="wrapper">
        <div class="left">
          <a-textarea class="textarea"
                      placeholder="Type your message..."
                      :auto-size="{ minRows: 1, maxRows: 3 }" />
        </div>
        <div class="right">
          <div class="icon face">
            <!-- <SmileOutlined /> -->
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="1em"
                 height="1em"
                 fill="currentColor"
                 class="bi bi-emoji-smile"
                 viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path fill-rule="evenodd"
                    d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z" />
              <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
          </div>
          <div class="icon files">
            <!-- <PaperClipOutlined /> -->
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="1em"
                 height="1em"
                 fill="currentColor"
                 class="bi bi-link-45deg"
                 viewBox="0 0 16 16">
              <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" />
            </svg>
          </div>
          <div class="icon send">
            <!-- <SendOutlined /> -->
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="1em"
                 height="1em"
                 fill="currentColor"
                 class="bi bi-cursor-fill"
                 viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, watchEffect } from 'vue'
import Avatar from '/@c/Avatar.vue'
import {
  SmileOutlined,
  PaperClipOutlined,
  SendOutlined
} from '@ant-design/icons-vue'
import NavHeader from '/@c/NavHeader.vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import parsingEmoji from '/@/utils/emjoyParse'
function useChat() {
  const state = reactive({})
}
export default defineComponent({
  name: 'chating',
  components: {
    Avatar,
    NavHeader,
    SmileOutlined,
    PaperClipOutlined,
    SendOutlined
  },
  setup() {
    const state = reactive({
      name: ''
    })
    const route = useRoute()
    const { chatId } = route.params
    state.name = chatId

    return { ...toRefs(state), parsingEmoji }
  }
})
</script>
<style lang='scss' scoped>
.chating {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  > .head {
    order: 1;
  }
  > .body {
    flex: 1;
    order: 1;
    padding: 1.25rem 1.5rem;
    overflow: hidden auto;
    &::-webkit-scrollbar {
      display: none;
    }
    > .messageList {
      width: 100%;
      // height: 100%;
      .messageItem {
        display: flex;
        align-items: flex-end;
        margin-bottom: 2rem;
        &:last-child {
          margin-bottom: 0;
        }
        &.notme {
          .messageBody {
            margin-left: 1.5rem;
            border-bottom-left-radius: 0;
            &::after {
              left: -0.85rem;
            }
          }
        }
        &.me {
          flex-direction: row-reverse;
          .messageBody {
            margin-right: 1.5rem;
            border-bottom-right-radius: 0;
            background-color: #4198ff;
            color: #fff;
            &::after {
              right: -0.85rem;
              border-color: transparent transparent #4198ff transparent;
            }
          }
        }
        .avatar {
          flex: 0 0 4.4rem;
        }
        .messageBody {
          position: relative;
          width: fit-content;
          max-width: 60%;
          padding: 1.2rem;
          line-height: 1.5;
          font-size: 1.4rem;
          background-color: #f5f6fa;
          border-radius: 0.8rem;
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 0;
            height: 0;
            border-color: transparent transparent #f5f6fa transparent;
            border-style: solid;
            border-width: 1rem;
          }
        }
      }
    }
  }
  > .foot {
    order: 3;
    > .wrapper {
      background: #f5f6fa;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      > .left {
        flex: 1;
        .textarea {
          height: auto;
          padding: 0.8rem;
          font-size: 1.4rem;
          line-height: 1.5715;
          border-radius: 0.375rem;
          display: block;
          width: 100%;
          color: #7f808c;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #fff;
          transition: border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
          outline: none;
          &:focus {
            border-color: #fff !important;
            outline: none;
            box-shadow: none;
          }
          &:hover {
            border-color: #fff !important;
          }
        }
      }
      > .right {
        display: flex;
        align-items: center;
        .icon {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          margin-left: 1rem;
          color: #aab0b7;
          font-size: 2.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.35s;
          &:hover {
            cursor: pointer;
            color: rgba(33, 37, 41, 0.5);
          }
          &:last-child {
            background: #0176ff;
            color: #fff;
            &:hover {
              background: #0064da;
            }
          }
        }
      }
    }
  }
}
</style>