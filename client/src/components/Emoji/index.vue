<template>
  <div>
    <Picker :data="emojiIndex"></Picker>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import data from '/@/assets/json/apple.json'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'
export default defineComponent({
  name: 'Emoji',
  components: { Picker },
  setup() {
    console.log(data)

    const emojiIndex = ref(new EmojiIndex(data))
    return { emojiIndex }
  }
})
</script>

<style lang='scss' scoped>
@import 'emoji-mart-vue-fast/css/emoji-mart.css';
</style>