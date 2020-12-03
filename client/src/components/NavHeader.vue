<template>
  <div class="navHeader">
    <slot name="prefix">
      <span class="back"
            @click="handleBack">
        <LeftOutlined />
      </span>
    </slot>
    <div class="content">
      <slot>
        <h6>{{title}}</h6>
        <p v-if="subTitle"
           class="subTitle">{{subTitle}}</p>
      </slot>
    </div>
    <slot name="suffix" />
  </div>
</template>

<script lang='ts'>
import { ref, reactive } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
export default {
  name: 'NavHeader',
  props: {
    background: { type: String, default: '#fff' },
    title: { type: String },
    subTitle: { type: String },
  },
  components: { LeftOutlined },
  setup() {
    const router = useRouter()
    return {
      handleBack: () => router.back(),
    }
  },
}
</script>
<style lang='scss' scoped>
.navHeader {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(245, 246, 250, 0.85) !important;
  .back {
    display: none;
    padding: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .subTitle {
      color: #aab0b7 !important;
      font-size: 86.667%;
      font-weight: 400;
      margin: 0;
    }
  }
}
@media (max-width: 768px) {
  .navHeader {
    .back {
      display: inline-block;
    }
  }
}
</style>
