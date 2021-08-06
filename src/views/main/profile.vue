<template>
  <div class="profile">
    <div class="content">
      <h2 class="title">Profile</h2>
      <div class="input-group">
        <input placeholder="Search for messages or users..."
               type="text" />
        <div>
          <svg width="1em"
               height="1em"
               viewBox="0 0 16 16"
               class="bi bi-search"
               fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
            <path fill-rule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
          </svg>
        </div>
      </div>
      <div class="mine">
        <Avatar width="8rem"
                height="8rem"
                :online="false"
                :src="userInfo.avatar" />
        <div class="name">{{userInfo.name}}</div>
        <!-- <div class="sign">I only wish to face the sea, with spring flowers blossoming.</div> -->
        <div class="sign">{{userInfo.sign}}</div>
      </div>
      <div class="infos">
        <ul class="infoList">
          <li class="infoItem">
            <div class="body">
              <div class="title">Account</div>
              <div class="message">{{userInfo.phone}}</div>
            </div>
            <svg width="1em"
                 height="1em"
                 viewBox="0 0 16 16"
                 class="bi bi-person-fill"
                 fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </li>
          <li class="infoItem">
            <div class="body">
              <div class="title">Stars</div>
              <div class="message">5</div>
            </div>
            <svg width="1em"
                 height="1em"
                 viewBox="0 0 16 16"
                 class="bi bi-star-fill"
                 fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </li>
          <li class="infoItem">
            <div class="body">
              <div class="title">Emoji</div>
            </div>
            <svg width="1em"
                 height="1em"
                 viewBox="0 0 16 16"
                 class="bi bi-emoji-wink"
                 fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path fill-rule="evenodd"
                    d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z" />
              <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5z" />
              <path fill-rule="evenodd"
                    d="M8.757 6.063a.5.5 0 0 1 .68.194.934.934 0 0 0 .813.493c.339 0 .645-.19.813-.493a.5.5 0 1 1 .874.486A1.934 1.934 0 0 1 10.25 7.75c-.73 0-1.356-.412-1.687-1.007a.5.5 0 0 1 .194-.68z" />
            </svg>
          </li>
        </ul>
      </div>
      <div class="btnGroup">
        <a-button @click="link('/settings')"
                  class="btnItem">
          <span>Settings</span>
          <svg width="1em"
               height="1em"
               viewBox="0 0 16 16"
               class="bi bi-gear"
               fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z" />
            <path fill-rule="evenodd"
                  d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z" />
          </svg>
        </a-button>
        <a-button @click="logOut"
                  class="btnItem">
          <span>Logout</span>
          <svg style="transform: rotate(90deg)"
               width="1em"
               height="1em"
               viewBox="0 0 16 16"
               class="bi bi-upload"
               fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path fill-rule="evenodd"
                  d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
          </svg>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Avatar from '@c/Avatar.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'profile',
  components: { Avatar },
  setup() {
    const store = useStore()
    const router = useRouter()
    const logOut = async () => {
      await store.dispatch('user/logout')
      router.push('/login')
    }
    const link = (path: string) => router.push(path)

    return { link, logOut, userInfo: computed(() => store.state.user.userInfo) }
  }
})
</script>
<style lang='scss' scoped>
.profile {
  .content {
    padding: 1.25rem 20px;
    > .title {
      font-weight: 700;
    }
    .mine {
      margin-top: 1.25rem;
      background: #fff;
      border-radius: 0.475rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2.5rem 3rem;
      .name {
        margin-top: 1rem;
        font-size: 1.8rem;
        color: #242939;
      }
      .sign {
        margin-top: 1rem;
        text-align: center;
        font-size: 1.6rem;
      }
    }
    .infos {
      margin-top: 1.25rem;
      .infoList {
        list-style: none;
        background: #fff;
        border-radius: 0.475rem;
        padding: 0.4rem 1.8rem;
        .infoItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          font-size: 1.6rem;
          border-bottom: 1px solid rgba(245, 246, 250, 0.85);
          &:last-child {
            border: none;
          }
          .body {
            flex: 1;
            margin-right: 2rem;
            .title {
              font-weight: 700;
              font-size: 1.6rem;
              margin-bottom: 0.2rem;
            }
            .message {
              font-size: 1.5rem;
            }
          }
        }
      }
    }
    .btnGroup {
      margin-top: 1.25rem;
      display: flex;
      justify-content: space-between;
      .btnItem {
        width: 48%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem 1.8rem;
        font-size: 1.6rem;
        height: auto;
        color: #242939;
        border-radius: 0.475rem;
        border: none;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
@media (min-width: 769px) {
  .profile {
    .content {
      .mine {
        padding: 2.4rem 3rem;
        .name {
          font-size: 1.6rem;
        }
        .sign {
          font-size: 1.4rem;
        }
      }
      .infos {
        .infoList {
          padding: 0.4rem 1.8rem;
          .infoItem {
            padding: 1.2rem 0;
            font-size: 1.5rem;
            .body {
              .title {
                font-size: 1.4rem;
              }
              .message {
                font-size: 1.4rem;
              }
            }
          }
        }
      }
      .btnGroup {
        .btnItem {
          padding: 1.4rem 1.8rem;
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>
