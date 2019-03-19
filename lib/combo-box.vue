<template>
  <div class="input-box dropdown-group" :readonly="readonly" :buttons="buttons"
    sparrow-popup :popup-action="popupAction" @optionclick.stop="onOptionClick">
    <input type="text" :placeholder="placeholder" v-model="inputValue" :readonly="readonly || isDropdownList">
    <a toggle-type="clear" popup-action="close" v-if="buttons" @click="clear"></a>
    <a toggle-type="expand" popup-action="toggle"></a>
    <div class="dropdown list-group" v-if="!readonly">
      <slot>
        <su-option v-for="(option, index) in options" :key="option.value" :option="option" v-if="options && options.length"></su-option>
      </slot>
    </div>
  </div>
</template>

<script>
  import { show, hide } from 'sparrow-popup'

  export default {
    name: 'SuComboBox',
    props: [ 'displayValue', 'value', 'readonly', 'placeholder', 'dropdownStyle', 'multiple', 'options', 'fields' ],
    model: {
      prop: 'value',
      event: 'change'
    },
    provide () {
      return {
        comboBox: this
      }
    },
    computed: {
      buttons () {
        return (this.readonly || !this.inputValue) ? undefined : '2'
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
      onOptionClick (event) {
        const option = event._su_event_data
        this.$emit('optionclick', option)
        const value = option[Object(this.fields).value || 'value']
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
