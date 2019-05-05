<template>
  <su-list-item
    :item="option"
    :fields="fields"
    :icon="icon"
    :label="label"
    :checked="checked"
    :disabled="disabled"
    :popup-action="popupActionValue"
    @itemclick="onOptionClick" />
</template>

<script>
  import emit from './utils/emit-event'

  export default {
    name: 'SuOption',
    props: ['option', 'value', 'icon', 'label', 'active', 'disabled', 'popupAction'],
    inject: ['comboBox'],
    computed: {
      fields () {
        return this.comboBox.fields
      },
      optionValue () {
        return this.value || Object(this.option)[Object(this.fields).value || 'value']
      },
      checked () {
        const { multiple, value } = this.comboBox
        return multiple && value
          ? value.findIndex(v => this.optionValue.toString() === v.toString()) > -1
          : undefined
      },
      popupActionValue () {
        return this.popupAction || (this.comboBox.multiple ? 'none' : 'close')
      }
    },
    methods: {
      getFieldValue (field) {
        return this[field] || Object(this.item)[Object(this.fields)[field] || field]
      },
      onOptionClick (item) {
        emit(this.$el, 'optionclick', { canBubble: true, data: this.optionValue })
      }
    }
  }
</script>
