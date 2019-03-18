<template>
  <a class="list-group-item" @click="onClick(option)" :popup-action="popupAction" :toggle-type="toggleType" :checked="checked" :disabled="disabled">
    <slot>
      <span v-if="icon" :class="icon"></span>
      <span v-if="label">{{ label }}</span>
    </slot>
  </a>
</template>

<script>
import emit from './emit-event'

export default {
  props: [ 'option' ],
  inject: [ 'comboBox' ],
  computed: {
    fields () {
      return Object(this.comboBox.fields)
    },
    disabled () {
      return this.option[this.fields.disabled || 'disabled']
    },
    value () {
      return this.option[this.fields.value || 'value']
    },
    label () {
      return this.option[this.fields.label || 'label']
    },
    icon () {
      return this.option[this.fields.icon || 'icon']
    },
    toggleType () {
      return this.comboBox.multiple ? 'check' : undefined
    },
    checked () {
      const { multiple, value } = this.comboBox
      return multiple && value
        ? value.findIndex(v => this.value.toString() === v.toString()) > -1
        : undefined
    },
    popupAction () {
      return this.comboBox.multiple ? 'none' : 'close'
    }
  },
  methods: {
    onClick (option) {
      if (!option.disabled) emit(this.$el, 'optionclick', { canBubble: true, data: option })
    }
  }
}
</script>
