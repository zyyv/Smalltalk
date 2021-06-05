<template>
  <div class="avatar"
       :style="style"
       :class="online ? 'online' : ''">
    <div :style="{ borderRadius: radius, backgroundImage: `url(${src})` }"></div>
  </div>
</template>

<script lang='ts' setup>
import { computed, defineProps, PropType } from 'vue'

const props = defineProps(
  {
    src: { type: Object as PropType(string) },
    online: {type: Object as PropType(boolean),default:true},
    radius: {type: Object as PropType(string),default:'50%'},
    width: {type: Object as PropType(number | string),default:'4.4rem'},
    height: {type: Object as PropType(number | string),default:'4.4rem'}
  }
)
props.src
// {
//   src: '',
//   online: true,
//   radius: '50%',
//   width: '4.4rem',
//   height: '4.4rem'
// }
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
