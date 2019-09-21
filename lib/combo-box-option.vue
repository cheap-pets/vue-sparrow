<template>
  <su-list-item
    :icon="itemIcon"
    :label="itemLabel"
    :checked="checked"
    :disabled="disabled"
    @itemclick="onOptionClick" />
</template>

<script>
  import isString from 'lodash.isstring'

  export default {
    name: 'SuOption',
    inject: ['$comboBox'],
    props: ['fields', 'option', 'icon', 'label', 'value', 'disabled'],
    computed: {
      itemValue () {
        return isString(this.option) ? this.item : this.getFieldValue('value')
      },
      itemLabel () {
        return isString(this.option) ? this.item : (this.getFieldValue('label') || this.itemValue)
      },
      itemIcon () {
        return this.getFieldValue('icon')
      },
      checked () {
        return this.$comboBox.multiple
          ? this.$comboBox.localValue.indexOf(this.itemValue) !== -1
          : undefined
      }
    },
    created () {
      this.$comboBox.appendOption({ label: this.itemLabel, value: this.itemValue })
    },
    beforeDestroy () {
      this.$comboBox.removeOption(this.itemValue)
    },
    methods: {
      getFieldValue (field) {
        field = Object(this.fields || this.$comboBox.fields)[field] || field
        return this[field] || (this.option ? this.option[field] : undefined)
      },
      onOptionClick (item) {
        const option = {
          label: this.itemLabel,
          value: this.itemValue,
          option: this.option
        }
        this.$comboBox.onOptionClick(option)
        this.$emit('optionclick', this.option || option)
      }
    }
  }
</script>
