<template>
  <su-combo-box
    slot-mode="any"
    :clearable="clearable"
    :display-value="inputValue"
    :readonly="readonly"
    @clear="onClear">
    <su-calendar
      class="dropdown"
      :style="{ width: dropdownWidth }"
      :select-mode="selectMode"
      :value="localValue"
      :range-start="rangeStart"
      :range-end="rangeEnd"
      :marked-dates="markedDates"
      :dropdown-direction="dropdownDirection"
      :dropdown-align="dropdownAlign || 'justify'"
      @change="onChange"
      @navigate="onNavigate" />
  </su-combo-box>
</template>

<script>
  import isDate from 'lodash.isdate'
  import isString from 'lodash.isstring'
  import { show, hide } from 'sparrow-popup'
  import formatDate from './utils/format-date'

  export default {
    name: 'SuDateBox',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: [
      'clearable', 'displayValue', 'dropdownAlign', 'dropdownDirection', 'dropdownWidth',
      'format', 'markedDates', 'rangeStart', 'rangeEnd', 'readonly', 'selectMode', 'value'
    ],
    data () {
      return {
        localValue: null
      }
    },
    computed: {
      inputValue () {
        const format = this.format ||
          (this.selectMode === 'year' ? 'YYYY' : this.selectMode === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD')
        return this.displayValue || (this.localValue ? formatDate(this.localValue, format) : '')
      }
    },
    watch: {
      value (value) {
        this.setLocalValue(value)
      }
    },
    mounted () {
      this.setLocalValue(this.value)
    },
    methods: {
      setLocalValue (value) {
        let v
        try {
          v = value
            ? (
              isDate(value)
                ? value
                : (isString(value) ? new Date(Date.parse(value)) : null)
            )
            : null
        } catch (e) {
        }
        this.localValue = v
      },
      onChange (value, year, month, date) {
        this.localValue = value
        this.$emit('change', value, year, month, date)
        this.collapse()
      },
      onNavigate (args) {
        this.$emit('navigate', args)
      },
      onClear () {
        this.setLocalValue(null)
        this.$emit('clear')
        this.$emit('change', null)
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
