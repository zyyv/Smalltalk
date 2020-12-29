<template>
  <div class="navHeader">
    <div class="left">
      <slot name="prefix">
        <span class="back"
              @click="handleBack">
          <LeftOutlined />
        </span>
      </slot>
    </div>
    <div class="content">
      <slot>
        <h6 class="title ellipsis">{{title}}</h6>
        <p v-if="subTitle"
           class="subTitle ellipsis">{{subTitle}}</p>
      </slot>
    </div>
    <div class="right">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'NavHeader',
  props: {
    background: { type: String, default: '#fff' },
    title: { type: String },
    subTitle: { type: String }
  },
  components: { LeftOutlined },
  setup() {
    const router = useRouter()
    return {
      handleBack: () => router.back()
    }
  }
})
</script>
<style lang='scss' scoped>
.navHeader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  min-height: 5rem;
  border-bottom: 1px solid rgba(245, 246, 250, 0.85) !important;
  .left,
  .right {
    height: 100%;
    top: 0;
    position: absolute;
  }
  .left {
    left: 0;
    .back {
      display: none;
      width: 5rem;
      height: 100%;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .right {
    right: 0;
  }

  .content {
    max-width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      width: 100%;
      margin: 0;
    }
    .subTitle {
      width: 100%;
      margin: 0.5rem 0 0 0;
      color: #aab0b7 !important;
      font-size: 86.667%;
      font-weight: 400;
    }
  }
}
@media (max-width: 768px) {
  .navHeader {
    .left {
      .back {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
