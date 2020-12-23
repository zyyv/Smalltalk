<template>
  <div class="emoji-list"
       :style="{width:`${col * 2.8 + (col - 1) * 0.4}rem`}">
    <div class="emoji-item"
         v-for="item in datas"
         :key="item.name"
         :style="{ 'background-image': `url(${item.src})`, '--col': col + 'n' }"></div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import emojis from '/@/assets/json/emoji.json'
const host = 'http://ql61yf5hl.hn-bkt.clouddn.com/'
export default defineComponent({
  name: 'Emoji',
  props: {
    col: {
      type: Number,
      default: 10
    }
  },
  setup() {
    const emojiData = emojis.map((it) => {
      return { ...it, src: `${host}${it.src}`, hover: `${host}${it.hover}` }
    })
    const datas = reactive(emojiData)
    console.log(datas)
    return { datas }
  }
})
</script>

<style lang='scss' scoped>
.emoji-list {
  display: flex;
  flex-wrap: wrap;
  .emoji-item {
    width: 2.8rem;
    height: 2.8rem;
    margin: 0 0.4rem 0.4rem 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    @function col() {
      @return var(--col);
    }
    order: var(--col);
    $nth: #{nth-of-type(col())};
    &:#{$nth} {
      margin-right: 0;
    }
  }
}
</style>