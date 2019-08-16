<template>
  <div class="su-input-box" :buttons="buttons" :readonly="readonly">
    <input
      class="su-input"
      type="text"
      :placeholder="readonly ? undefined : placeholder"
      :readonly="!editable"
      :value="text"
      @focus="onFoucs"
      @input="onInput"
      @click="onInputClick">
    <a
      v-if="clearButtonVisible"
      class="su-input-icon"
      @click="clear">
      x
    </a>
    <a
      class="su-input-icon"
      @click="onButtonClick">
      -
    </a>
    <su-dropdown>
      <slot />
    </su-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'SuComboBox',
    model: {
      prop: 'value',
      event: 'change'
    },
    provide () {
      return {
        comboBox: this
      }
    },
    props: {
      clearable: {
        type: Boolean,
        default: true
      },
      displayValue: [String, Number],
      dropdownStyle: {
        type: String,
        default: 'dropdownList',
        validator (value) {
          return ['none', 'dropdown', 'dropdownList', 'drawer', 'drawerList'].indexOf(value) !== -1
        }
      },
      placeholder: String,
      readonly: {
        type: Boolean,
        default: false
      },
      value: [Array, String, Number]
    },
    data () {
      return {
        text: null
      }
    },
    computed: {
      buttons () {
        return this.clearButtonVisible
          ? '2'
          : undefined
      },
      clearButtonVisible () {
        return this.clearable && this.text
      },
      editable () {
        return !this.readonly && ['none', 'dropdown', 'drawer'].indexOf(this.dropdownStyle) !== -1
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
      onFoucs (event) {
        this.$emit('focus', event, this)
      },
      onInput (event) {
        this.inputValue = event.target.value
        this.$emit('input', event, this)
        this.$emit('change', event.target.value, this)
      },
      onInputClick() {

      },
      onButtonClick() {

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
