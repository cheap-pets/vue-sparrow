<template>
  <div
    v-if="localVisible"
    class="su-dropdown"
    :visibility="visibility"
    :style="{ top, right, bottom, left, width, height, maxWidth, maxHeight }">
    <slot />
  </div>
</template>

<script>
  import '../pcss/dropdown.pcss'
  import getClientRect from '../utils/client-rect'

  let _visibleEl = null

  export default {
    model: {
      prop: 'visible',
      event: 'change'
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      width: String,
      height: String,
      maxWidth: String,
      maxHeight: String
    },
    data () {
      return {
        localVisible: false,
        visibility: 'hidden',
        top: undefined,
        right: undefined,
        bottom: undefined,
        left: undefined
      }
    },
    watch: {
      visible (v) {
        this.setVisible(v)
      }
    },
    mounted () {
      this.setVisible(this.visible)
      document.body.appendChild(this.$el)
    },
    beforeDestroy () {
      document.body.removeChild(this.$el)
    },
    methods: {
      setVisible (v) {
        if (this.lcoalVisible !== v) {
          if (v) this.show()
          else this.hide()
        }
      },
      calcPosition () {
        const rect = getClientRect(this.$parent.$el)
        this.top = (rect.bottom + 1) + 'px'
      },
      show () {
        if (this.$hideTimer) {
          clearTimeout(this.$hideTimer)
          delete this.$hideTimer
        }
        if (_visibleEl && _visibleEl !== this) {
          _visibleEl.hide()
        }
        _visibleEl = this
        this.localVisible = true
        this.$nextTick(() => {
          this.calcPosition()
          this.visibility = 'visible'
        })
        this.$emit('change', true)
      },
      hide () {
        if (this.$hideTimer) return
        if (_visibleEl === this) {
          _visibleEl = null
        }
        this.visibility = 'hidden'
        this.$hideTimer = setTimeout(() => {
          delete this.$hideTimer
          this.localVisible = false
          this.$emit('change', false)
        }, 250)
      }
    }
  }
</script>
