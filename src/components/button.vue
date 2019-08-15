<template>
  <button
    class="su-button"
    :icon-only="isIconOnly"
    :button-type="buttonType"
    :button-style="buttonStyle"
    :button-shape="buttonShape"
    @click="onClick">
    <i v-if="icon" class="icon" />
    <slot>
      <span v-if="!iconOnly && caption">{{ caption }}</span>
    </slot>
  </button>
</template>

<script>
  import '../pcss/button.pcss'

  export default {
    name: 'SuButton',
    props: {
      buttonType: {
        type: String,
        default: 'normal',
        validator (value) {
          return ['normal', 'primary', 'submit', 'danger'].indexOf(value) !== -1
        }
      },
      buttonStyle: {
        type: String,
        default: 'normal',
        validator (value) {
          return ['normal', 'outline', 'text', 'link'].indexOf(value) !== -1
        }
      },
      buttonShape: {
        type: String,
        default: 'normal',
        validator (value) {
          return ['normal', 'round'].indexOf(value) !== -1
        }
      },
      caption: String,
      icon: String,
      iconOnly: Boolean
    },
    computed: {
      isIconOnly () {
        console.log(this.$slots)
        return this.iconOnly || (!this.$slots.default && !this.caption && this.icon)
      }
    },
    methods: {
      onClick () {
        this.$emit('click')
      }
    }
  }
</script>
