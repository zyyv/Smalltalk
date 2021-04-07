<template>
  <div class="welcome">
    <Avatar width="7.5rem"
            height="7.5rem"
            :src="userInfo.avatar" />
    <h3 class="title">Hey，{{userInfo.name}}！</h3>
    <p class="desc">Please select a chat to start messaging.</p>
    <Emoji />

  </div>
</template>

<script lang='ts'>
import Avatar from '@c/Avatar.vue'
import Emoji from '@c/Emoji/index.vue'
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'welcome',
  components: { Avatar, Emoji },
  setup() {
    const store = useStore()
    return {
      userInfo: computed(() => store.state.user.userInfo)
    }
  }
})
</script>
<style lang='scss' scoped>
.welcome {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    line-height: 5rem;
  }
}
</style>
