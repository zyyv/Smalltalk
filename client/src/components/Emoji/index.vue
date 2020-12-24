<template>
  <a-popover v-model:visible="showEmojiList"
             overlayClassName="customEmoji"
             placement="top"
             trigger="click">
    <template #content>
      <Scroller :data="datas"
                class="wrapper">
        <div class="emoji-list"
             :style="{width:`${col * (2.8 + 0.4)}rem`}">
          <a-popover v-model:visible="item.show"
                     v-for="item in datas"
                     :key="item.name"
                     overlayClassName="customEmoji"
                     placement="top">
            <template #content>
              <div @click="handleSelect(item)"
                   class="emoji-item"
                   :style="{ 'background-image': `url(${item.hover})` }"></div>
              <div class="emoji-info">{{item.info}}</div>
            </template>
            <div @click="handleSelect(item)"
                 @touchstart="item.show=true"
                 @touchend="item.show=false"
                 class="emoji-item"
                 :style="{ 'background-image': `url(${item.src})` }"></div>
          </a-popover>
        </div>
      </Scroller>
    </template>
    <slot>
      <span class="face">
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
      </span>
    </slot>
  </a-popover>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive } from 'vue'
import emojis from '/@/assets/json/emoji.json'
import Scroller from '/@c/Scroller/index.vue'

interface Emoji {
  name: string
  src: string
  info: string
  hover: string
  value: string
  show: boolean
}
function useData() {
  const host = 'http://ql61yf5hl.hn-bkt.clouddn.com/'
  const emojiData: Emoji[] = emojis.map((it: Emoji) => {
    return {
      ...it,
      src: `${host}${it.src}`,
      hover: `${host}${it.hover}`,
      show: false
    }
  })
  const datas = reactive(emojiData)
  return { datas }
}

function useOutsidePopover() {
  const showEmojiList = ref(false)
  return { showEmojiList }
}

export default defineComponent({
  name: 'Emoji',
  components: { Scroller },
  props: {
    col: {
      type: Number,
      default: 8
    }
  },
  setup(props, ctx) {
    const { showEmojiList } = useOutsidePopover()
    const handleSelect = (item: Emoji) => {
      console.log(item)
      item.show = false
      showEmojiList.value = false
      ctx.emit('select', item)
    }
    return { ...useData(), showEmojiList, handleSelect }
  }
})
</script>

<style lang='scss' scoped>
.face {
  font-size: 2.2rem;
  color: #aab0b7;
  &:hover {
    cursor: pointer;
    color: rgba(33, 37, 41, 0.5);
  }
}
.wrapper {
  height: 250px;
  overflow: hidden;
}
.emoji-list {
  display: flex;
  flex-wrap: wrap;
}
.emoji-item {
  width: 2.8rem;
  height: 2.8rem;
  margin: 0.2rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  &:hover {
    cursor: pointer;
  }
  // @function col() {
  //   @return var(--col);
  // }
  // order: var(--col);
  // $nth: #{nth-of-type(col())};
  // &:#{$nth} {
  //   margin-right: 0;
  // }
}
.emoji-info {
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 0.4rem;
}
@media (max-width: 768px) {
  .wrapper {
    height: 160px;
  }
}
</style>