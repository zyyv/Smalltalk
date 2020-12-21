<template>
  <div class="avatar"
       :style="style"
       :class="online ? 'online' : ''">
    <div :style="{ 'border-radius': radius, 'background-image': `url(${src})` }"></div>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, computed } from 'vue'
export default {
  name: 'avatar',
  props: {
    src: String,
    online: {
      type: Boolean,
      default: true,
    },
    radius: {
      type: String,
      default: '50%',
    },
    width: {
      type: [Number, String],
      default: '4.4rem',
    },
    height: {
      type: [Number, String],
      default: '4.4rem',
    },
  },
  setup(props) {
    const isDef = (val: any) => val !== undefined && val !== null
    const isNumeric = (val: any) => /^\d+(\.\d+)?$/.test(val)
    const addUnit = (val: any) => {
      if (!isDef(val)) {
        return undefined
      }
      val = String(val)
      return isNumeric(val) ? val + 'px' : val
    }
    const style = computed(() => ({
      width: addUnit(props.width),
      height: addUnit(props.height),
    }))
    return { style }
  },
}
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
      content: '';
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
