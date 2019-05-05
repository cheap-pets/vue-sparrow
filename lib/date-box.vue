<template>
  <div class="input-box dropdown-group" :readonly="readonly" :buttons="buttons"
    sparrow-popup>
    <input type="text" :placeholder="placeholder" :value="inputValue" readonly :popup-action="popupAction">
    <a v-if="buttons" toggle-type="clear" popup-action="close" @click="clear" />
    <a toggle-type="expand" popup-action="toggle" />
    <su-calendar v-if="!readonly" :select-mode="selectMode" class="dropdown" :style="{ width: dropdownWidth }"
      :value="localValue" :range-start="rangeStart" :range-end="rangeEnd" :marked-dates="markedDates"
      :dropdown-direction="dropdownDirection" :dropdown-align="dropdownAlign || 'justify'"
      @change="onChange" @navigate="onNavigate" />
  </div>
</template>

<script>
  import { show, hide } from 'sparrow-popup'
  import formatDate from './utils/format-date'

  export default {
    name: 'SuComboBox',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: [
      'clearButton', 'displayValue', 'dropdownAlign', 'dropdownDirection', 'dropdownWidth', 'format',
      'markedDates', 'placeholder', 'rangeStart', 'rangeEnd', 'readonly', 'selectMode', 'value'
    ],
    data () {
      return {
        localValue: null
      }
    },
    computed: {
      buttons () {
        return (String(this.clearButton).toLowerCase() === 'false' || this.readonly || !this.inputValue)
          ? undefined
          : '2'
      },
      popupAction () {
        return (this.readonly) ? 'none' : 'toggle'
      },
      inputValue () {
        const format = this.format ||
          (this.selectMode === 'year' ? 'YYYY' : this.selectMode === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD')
        return this.displayValue || (this.localValue ? formatDate(this.localValue, format) : '')
      }
    },
    watch: {
      value (v) {
        this.localValue = v
      }
    },
    mounted () {
      this.localValue = this.value
    },
    methods: {
      onChange (value, year, month, date) {
        this.localValue = value
        this.$emit('change', value, year, month, date)
        this.collapse()
      },
      onNavigate (args) {
        this.$emit('navigate', args)
      },
      clear () {
        this.localValue = null
        this.$emit('change', null)
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
