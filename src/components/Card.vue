<template>
  <div class="card">
    <div class="wrapper">
      <Avatar class="avatar"
              width="4.75rem"
              height="4.75rem"
              src='https://himg.bdimg.com/sys/portraitn/item/89c7456e646c657373746561726c9c89' />
      <!-- <div class="body">
        <h6 class="name">Chris Brwon</h6>
        <p class="info">Online</p>
      </div> -->
      <slot></slot>
      <slot name="right"></slot>
      <div v-if="notify !== 0"
           class="notify">
        <span class="num">{{notify}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import Avatar from './Avatar.vue'
export default defineComponent({
  name: 'card',
  props: {
    notify: {
      type: Number,
      default: 0
    }
  },
  components: { Avatar }
})
</script>
<style lang='scss' scoped>
.card {
  position: relative;
  padding: 1.5rem 1.25rem;
  background: #fff;
  border: 1px solid rgba(245, 246, 250, 0.85);
  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;
  }
  .wrapper {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 1rem;
    }
    .notify {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.4rem;
      height: 2.4rem;
      overflow: hidden;
      background-color: var(--blue);
      border-radius: 50%;
      border: 0.5rem solid var(--white);
      transform: translate(25%, -25%);
      .num {
        font-size: 0.9rem;
        color: var(--white);
      }
    }
  }
}
</style>
