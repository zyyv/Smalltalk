<template>
  <div class="zone">
    <div class="zone-bg">
      <div class="publish">
        <svg width="1em"
             height="1em"
             viewBox="0 0 16 16"
             class="bi bi-patch-plus-fll"
             fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
        </svg>
      </div>
      <div class="user">
        <span class="name">{{userInfo.name}}</span>
        <Avatar radius=".5rem"
                width="6rem"
                height="6rem"
                :online="false"
                :src="userInfo.avatar" />
      </div>
    </div>
    <div class="content">
      <div class="zonelist">
        <div v-for="item in posts"
             :key="item._id"
             class="zoneitem">
          <Avatar style="flex: 0 0 5rem; font-size: 0; margin-right: 1.3rem"
                  radius=".5rem"
                  width="5rem"
                  height="5rem"
                  :online="false"
                  :src="item.author.avatar" />
          <div class="wrapper">
            <div class="head">
              <div class="name">{{item.author.name}}</div>
              <div class="time">{{getDateByTime(+new Date(item.createdAt))}}</div>
            </div>
            <div class="body">
              <div class="text">
                {{item.content}}
              </div>
              <div class="imgList">
                <div class="imgItem"
                     v-for="src in item.images"
                     :key="src"
                     :style="{ 'background-image': `url(${src})` }"></div>
              </div>
            </div>
            <div class="foot">
              <div class="likes">
                <div class="city">
                  <svg width="1em"
                       height="1em"
                       viewBox="0 0 16 16"
                       class="bi bi-geo-alt"
                       fill="currentColor"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path fill-rule="evenodd"
                          d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  <span style="margin-left: 0.5rem">{{item.location}}</span>
                </div>
                <a-tooltip overlayClassName="zoneTooltip"
                           trigger="click"
                           arrowPointAtCenter
                           placement="left">
                  <template #title>
                    <div class="tips">
                      <div v-if="!item.isliked"
                           @click="liked(item._id)"
                           class="tipItem">
                        <svg width="1em"
                             height="1em"
                             viewBox="0 0 16 16"
                             class="bi bi-heart"
                             fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg><span>点赞</span>
                      </div>
                      <div v-else
                           @click="disliked(item._id)"
                           class="tipItem">
                        <svg width="1em"
                             height="1em"
                             viewBox="0 0 16 16"
                             class="bi bi-heart-fill"
                             fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg><span>取消</span>
                      </div>
                      <div class="tipItem">
                        <svg width="1em"
                             height="1em"
                             viewBox="0 0 16 16"
                             class="bi bi-chat-left-text"
                             fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                                d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                          <path fill-rule="evenodd"
                                d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                        </svg><span>评论</span>
                      </div>
                    </div>
                  </template>
                  <div class="likebtn">
                    <svg width="1em"
                         height="1em"
                         viewBox="0 0 16 16"
                         class="bi bi-three-dots"
                         fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                  </div>
                </a-tooltip>
              </div>
              <div class="comments">
                <div v-if="item.likes.length"
                     class="head">
                  <div class="icon">
                    <svg width="1em"
                         height="1em"
                         viewBox="0 0 16 16"
                         class="bi bi-heart-fill"
                         fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                  </div>
                  <template v-for="(like,i) in item.likes"
                            :key="like._id">
                    <span class="noSelected">{{like.name}}</span><span class="noSelected"
                          v-if="i !== item.likes.length - 1">,</span>
                  </template>
                </div>
                <div v-if="item.comments.length"
                     class="body">
                  <div v-for="com in item.comments"
                       :key="com._id">
                    <span class="name noSelected">{{com.author.name}}</span>
                    <template v-if="com.replyed">
                      <span class="noSelected">回复</span><span class="name noSelected">{{com.replyed.author.name}}</span>
                    </template>
                    <span class="noSelected">：</span><span>{{com.content}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import Avatar from '/@c/Avatar.vue'
import { useStore } from 'vuex'
import { ZoneData } from '../../api'
import { getDateByTime } from '../../utils'
import { message } from 'ant-design-vue'
import { httpGet } from '../../api/axios'

function useView() {
  const posts = ref([])
  const loadPosts = () => {
    ZoneData.list().then((res) => {
      posts.value = res.data.data
    })
  }
  return { posts, loadPosts }
}
interface Func {
  (): void
}

function useLike(callback: Func) {
  const liked = (postId: string) => {
    ZoneData.liked({ postId }).then(() => {
      callback()
    })
  }
  const disliked = (postId: string) => {
    ZoneData.disliked({ postId }).then(() => {
      callback()
    })
  }
  return { liked, disliked }
}

export default defineComponent({
  name: 'zone',
  components: { Avatar },
  setup() {
    const store = useStore()
    const { posts, loadPosts } = useView()
    loadPosts()
    return {
      posts,
      getDateByTime,
      ...useLike(loadPosts),
      userInfo: computed(() => store.state.user.userInfo)
    }
  }
})
</script>
<style lang='scss' scoped>
.zone {
  > .zone-bg {
    position: relative;
    width: 100%;
    height: 26.4rem;
    background-image: url('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=733641860,2551783747&fm=26&gp=0.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    color: #edeef6;
    .publish {
      cursor: pointer;
      position: absolute;
      right: 1.4rem;
      top: 2rem;
      font-size: 2.8rem;
    }
    .user {
      position: absolute;
      bottom: -1rem;
      right: 1.4rem;
      display: flex;
      align-items: center;
      .name {
        font-size: 1.7rem;
        margin: 10px;
      }
    }
  }
  > .content {
    padding: 3.25rem 20px 1.25rem;
    .zonelist {
      .zoneitem {
        padding: 2rem 0;
        border-bottom: 1px solid #edeef6;
        display: flex;
        .wrapper {
          flex: 1;
          > .head {
            .name {
              font-size: 1.7rem;
              color: #669999;
            }
            .time {
              color: #aab0b7;
            }
          }
          > .body {
            margin-top: 1rem;
            .text {
              font-size: 1.6rem;
            }
            .imgList {
              display: flex;
              flex-wrap: wrap;
              margin-top: 1rem;
              .imgItem {
                width: 48%;
                padding-top: 48%;
                border-radius: 0.3rem;
                margin: 0 2% 2% 0;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                &:nth-of-type(3n) {
                  margin-right: 0;
                }
                // &.alone{
                //   width: 80%;
                //   // height: 200px;
                //   // height: auto;
                // }
              }
            }
          }
          > .foot {
            margin-top: calc(1rem - 2%);
            .likes {
              display: flex;
              justify-content: space-between;
              .city {
                display: flex;
                align-items: center;
                color: #aab0b7;
              }
              .likebtn {
                display: flex;
                align-items: center;
                padding: 0.1rem 0.8rem;
                border-radius: 0.2rem;
                background: #edeef6;
              }
            }
            .comments {
              margin-top: 0.6rem;
              border-radius: 0.2rem;
              background: #edeef6;
              .head {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.5rem;
                color: #669999;
                .icon {
                  display: flex;
                  align-items: center;
                  padding-right: 0.5rem;
                  // color: #6f42c1;
                  color: #008c8c;
                }
              }
              .body {
                padding: 0.5rem;
                border-top: 1px solid #f5f6fa;
                .name {
                  color: #669999;
                }
              }
            }
          }
        }
      }
    }
  }
}
.tips,
.tipItem {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.tipItem {
  padding: 6px 8px;
  svg {
    margin-right: 0.5rem;
  }
}
@media (min-width: 769px) {
  .zone {
    > .content {
      .zonelist {
        .zoneitem {
          .wrapper {
            .head {
              // height: 5rem;
              .name {
                font-size: 1.5rem;
              }
              .time {
                margin-top: 0.5rem;
                font-size: 1.2rem;
              }
            }
            > .body {
              .text {
                font-size: 1.4rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
