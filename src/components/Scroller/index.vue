<template>
  <div ref="wrapper">
    <slot />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, nextTick, watch } from 'vue'
import BScroll, { BScrollInstance, Options } from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(MouseWheel)

function _init(elm: HTMLElement | string, option: Options): BScrollInstance {
  const scroll = new BScroll(elm, { ...option })
  return scroll
}

export default defineComponent({
  name: 'Scroller',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 3
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启纵向滚动
     */
    scrollY: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  setup(props, ctx) {
    const wrapper = ref() // dom
    const scroll = ref<null | BScrollInstance>(null) // BScroll
    nextTick(() => {
      scroll.value = _init(wrapper.value, {
        probeType: props.probeType,
        click: props.click,
        scrollX: props.scrollX,
        scrollY: props.scrollY,
        mouseWheel: true
      })
      if (props.listenScroll) {
        scroll.value.on('scroll', (pos: any) => {
          ctx.emit('scroll', pos)
        })
      }
    })
    const disable = () => {
      // 代理better-scroll的disable方法
      scroll.value && scroll.value.disable()
    }
    const enable = () => {
      // 代理better-scroll的enable方法
      scroll.value && scroll.value.enable()
    }
    const refresh = () => {
      // 代理better-scroll的refresh方法
      scroll.value && scroll.value.refresh()
    }
    function scrollTo() {
      // 代理better-scroll的scrollTo方法
      scroll.value &&
        scroll.value.scrollTo.apply(scroll.value, arguments as any)
    }
    function scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      scroll.value &&
        scroll.value.scrollToElement.apply(scroll.value, arguments as any)
    }
    watch(props.data, () => {
      setTimeout(() => {
        refresh()
      }, props.refreshDelay)
    })
    return { wrapper, disable, enable, refresh, scrollTo, scrollToElement }
  }
})
</script>