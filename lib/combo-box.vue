<template>
  <div
    class="input-box dropdown-group"
    :readonly="readonly"
    :buttons="buttons"
    sparrow-popup
    @optionclick.stop="onOptionClick">
    <input
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      :popup-action="isDropdownList ? popupAction : 'none'"
      :readonly="readonly || isDropdownList"
      @input="onInput">
    <a v-if="buttons" toggle-type="clear" popup-action="close" @click="clear" />
    <a :toggle-type="toggleType || 'expand'" popup-action="toggle" />
    <div v-if="!readonly" class="dropdown"
      :class="{ 'list-group': dropdownStyle !== 'dropdownpanel' }"
      :style="{ width: dropdownWidth }"
      :dropdown-direction="dropdownDirection"
      :dropdown-align="dropdownAlign || 'justify'">
      <slot>
        <template v-if="options">
          <su-option v-for="option in options" :key="option.value" :option="option" />
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
  import { show, hide } from 'sparrow-popup'

  export default {
    name: 'SuComboBox',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: [
      'clearButton', 'displayValue',
      'dropdownAlign', 'dropdownDirection', 'dropdownStyle', 'dropdownWidth',
      'fields', 'multiple', 'options', 'placeholder', 'readonly', 'toggleType', 'value'
    ],
    provide () {
      return {
        comboBox: this
      }
    },
    computed: {
      buttons () {
        return (String(this.clearButton).toLowerCase() === 'false' || this.readonly || !this.inputValue)
          ? undefined
          : '2'
      },
      isDropdownList () {
        return !this.dropdownStyle || this.dropdownStyle.toLowerCase() === 'dropdownlist'
      },
      popupAction () {
        return (this.readonly || !this.isDropdownList) ? 'none' : 'toggle'
      },
      inputValue: {
        get () {
          const { value: valueField = 'value' } = Object(this.fields)
          return this.displayValue === undefined
            ? (
              this.value
                ? (
                  this.isDropdownList
                    ? (
                      this.multiple
                        ? (
                          this.options
                            ? (
                              this.value
                                .map(v => this.getOptionLabel(this.options.find(option => option[valueField] === v)))
                                .join(',')
                            )
                            : ''
                        )
                        : (
                          this.options
                            ? this.getOptionLabel(this.options.find(option => option[valueField] === this.value))
                            : ''
                        )
                    )
                    : (Array.isArray(this.value) ? this.value.join(',') : this.value)
                )
                : ''
            )
            : this.displayValue
        },
        set (v) {
          this.$emit('change', v)
        }
      }
    },
    methods: {
      getOptionLabel (option) {
        const { label: labelField = 'label', value: valueField = 'value' } = Object(this.fields)
        return option ? option[labelField] || option[valueField] : ''
      },
      onInput (event) {
        this.$emit('input', event.target.value, this)
      },
      onOptionClick (event) {
        const value = event._su_event_data
        if (this.multiple) {
          const values = [].concat(this.value)
          const idx = values.findIndex(v => v.toString() === value.toString())
          if (idx > -1) values.splice(idx, 1)
          else values.push(value)
          this.$emit('change', values)
        } else {
          this.$emit('change', value)
        }
      },
      clear () {
        this.$emit('change', this.multiple ? [] : '')
      },
      expand () {
        show(this.$el)
      },
      collapse () {
        hide(this.$el)
      }
    }
  }
</script>
