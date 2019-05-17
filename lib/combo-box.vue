<template>
  <div class="input-box"
    :class="{ 'dropdown-group': dropdownStyle !== 'none' }"
    :readonly="readonly"
    :buttons="buttons"
    sparrow-popup>
    <input type="text"
      :placeholder="readonly ? undefined : placeholder"
      :popup-action="inputPopupAction"
      :readonly="inputReadonly"
      :value="inputValue"
      @focus="onFoucs"
      @input="onInput">
    <a v-if="clearable && inputValue" popup-action="close" toggle-type="clear" @click="clear" />
    <a v-if="toggleType" popup-action="toggle" :toggle-type="toggleType === true ? 'expand' : toggleType" />
    <template v-if="dropdownStyle !== 'none'">
      <slot v-if="slotMode === 'any'" />
      <template v-else>
        <div v-if="isDrawer" class="sub-mask" popup-action="close">
          <div
            class="drawer list-group"
            popup-action="none"
            grid-line
            :style="{ maxHeight: popupHeight }"
            :drawer-from="popupPosition">
            <slot>
              <su-option v-for="(option, index) in options" :key="index" :option="option" />
            </slot>
          </div>
        </div>
        <div v-else
          class="dropdown list-group"
          :style="{ width: popupWidth, maxHeight: popupHeight }"
          :dropdown-align="dropdownAlign"
          :dropdown-direction="popupPosition">
          <slot>
            <su-option v-for="(option, index) in options" :key="index" :option="option" />
          </slot>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
  import { show, hide } from 'sparrow-popup'
  import isString from 'lodash.isstring'

  export default {
    name: 'SuComboBox',
    model: {
      prop: 'value',
      event: 'change'
    },
    provide () {
      return {
        $comboBox: this
      }
    },
    props: {
      clearable: {
        type: Boolean,
        default: true
      },
      displayValue: [String, Number],
      dropdownAlign: {
        type: String,
        default: 'justify'
      },
      dropdownStyle: {
        type: String,
        default: 'dropdownList',
        validator (value) {
          return ['dropdown', 'dropdownList', 'drawer', 'drawerList', 'none'].indexOf(value) !== -1
        }
      },
      fields: Object,
      multiple: {
        type: Boolean,
        default: false
      },
      options: Array,
      placeholder: String,
      popupPosition: {
        type: String,
        default: 'bottom',
        validator (value) {
          return ['top', 'bottom'].indexOf(value) !== -1
        }
      },
      popupHeight: String,
      popupWidth: String,
      readonly: {
        type: Boolean,
        default: false
      },
      slotMode: {
        type: String,
        default: 'options',
        validator (value) {
          return ['options', 'any'].indexOf(value) !== -1
        }
      },
      separator: {
        type: String,
        default: ','
      },
      toggleType: {
        type: [Boolean, String],
        default: 'expand'
      },
      value: [Array, String, Number]
    },
    data () {
      return {
        inputValue: null,
        localValue: this.multiple ? [] : null,
        storedOptions: []
      }
    },
    computed: {
      buttons () {
        return !this.clearable || this.readonly || !this.inputValue || this.toggleType === false
          ? undefined
          : '2'
      },
      inputReadonly () {
        return this.readonly || this.dropdownStyle === 'dropdownList' || this.dropdownStyle === 'drawerList'
      },
      inputPopupAction () {
        return this.readonly || this.dropdownStyle === 'dropdown' || this.dropdownStyle === 'drawer'
          ? 'none'
          : 'toggle'
      },
      isDrawer () {
        return this.dropdownStyle === 'drawer' || this.dropdownStyle === 'drawerList'
      }
    },
    watch: {
      value (value) {
        this.setLocalValue(value)
      },
      displayValue () {
        this.resetInputValue()
      }
    },
    mounted () {
      this.setLocalValue(this.value)
    },
    methods: {
      setLocalValue (value) {
        this.localValue = this.multiple
          ? (
            value
              ? (
                isString(value)
                  ? value.split(this.separator)
                  : (
                    Array.isArray(value) ? value : [value]
                  )
              )
              : []
          )
          : value
        this.resetInputValue()
      },
      resetInputValue () {
        if (this._resetTimer) {
          clearTimeout(this._resetTimer)
          delete this._resetTimer
        }
        this._resetTimer = setTimeout(() => {
          if (this.displayValue != null) {
            this.inputValue = this.displayValue
          } else {
            const values = this.multiple ? this.localValue : [this.localValue]
            this.inputValue = values
              .map(value => Object(this.storedOptions.find(option => option.value === value)).label || value)
              .join(this.separator)
          }
          this.$el.querySelector('input').value = this.inputValue
        }, 50)
      },
      findOptionIndex (value) {
        return this.storedOptions.findIndex(option => option.value === value)
      },
      appendOption (option) {
        const idx = this.findOptionIndex(option.value)
        const options = this.storedOptions
        if (idx !== -1) options[idx].label = options.label
        else options.push(option)
        this.resetInputValue()
      },
      removeOption (value) {
        //
      },
      onFoucs (event) {
        this.$emit('focus', event, this)
      },
      onInput (event) {
        this.inputValue = event.target.value
        this.$emit('input', event, this)
        this.$emit('change', event.target.value, this)
      },
      onOptionClick ({ label, value, option }) {
        this.$emit('optionclick', option || { label, value })
        if (this.multiple) {
          const idx = this.localValue.indexOf(value)
          if (idx !== -1) this.localValue.splice(idx, 1)
          else this.localValue.push(value)
          this.resetInputValue()
          this.$emit('change', this.localValue, this)
        } else {
          this.collapse()
          if (this.localValue !== value) {
            this.localValue = value
            this.resetInputValue()
            this.$emit('change', value, this)
          }
        }
      },
      clear () {
        this.setLocalValue(null)
        this.$emit('clear')
        this.$emit('change', this.localValue, this)
      },
      expand () {
        this.$emit('expand', this)
        show(this.$el)
      },
      collapse () {
        this.$emit('collapse', this)
        hide(this.$el)
      }
    }
  }
</script>
