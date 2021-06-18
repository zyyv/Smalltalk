<template>
  <div class="avatar" :style="style" :class="online ? 'online' : ''">
    <div :style="{ borderRadius: radius, backgroundImage: `url(${src})` }"></div>
  </div>
</template>

<script lang='ts' setup>
import { computed, defineProps } from 'vue'
import type { PropType } from 'vue'
import { addUnit } from '@/utils'

const props = defineProps({
  src: { type: Object as PropType<string> },
  online: { type: Object as PropType<boolean>, default: true },
  radius: { type: Object as PropType<string>, default: '50%' },
  width: { type: Object as PropType<number | string>, default: '4.4rem' },
  height: { type: Object as PropType<number | string>, default: '4.4rem' }
})

const style = computed(() => ({
  width: addUnit(props.width),
  height: addUnit(props.height)
}))
</script>
<style lang='scss' scoped>
.avatar {
  display: inline-block;
  position: relative;
  line-height: 0;
  > div {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  &.online {
    &::after {
      position: absolute;
      border: 3px solid #fff;
      display: block;
      bottom: -3px;
      right: 0;
      content: "";
      border-radius: 50%;
      transform: translate(-10%, 0);
      height: 30%;
      min-height: 30%;
      width: 30%;
      min-width: 30%;
      background: #42ba96;
    }
  }
}
</style>
