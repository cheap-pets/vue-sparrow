<template>
  <div class="btn-group">
    <slot>
      <template v-if="buttons">
        <su-button v-for="(btn,index) in buttons" :key="index" @click="onButtonClick(btn)"
          :icon="getBtnIcon(btn)" :buttonType="getBtnType(btn)" :buttonStyle="getBtnStyle(btn)"
          :disabled="disabled" :toggled="toggled === btn">{{ getBtnText(btn) }}</su-button>
      </template>
    </slot>
  </div>
</template>

<script>
  import isString from 'lodash.isstring'

  export default {
    name: 'SuButtonGroup',
    props: ['buttons', 'buttonType', 'buttonStyle', 'disabled', 'toggled'],
    model: {
      prop: 'toggled',
      event: 'togglechange'
    },
    methods: {
      getBtnType (btn) {
        return Object(btn).buttonType || this.buttonType
      },
      getBtnStyle (btn) {
        return Object(btn).buttonStyle || this.buttonStyle
      },
      getBtnIcon (btn) {
        return Object(btn).icon
      },
      getBtnText (btn) {
        return Object(btn).text || (isString(btn) ? btn : undefined)
      },
      getBtnDsiabled (btn) {
        return Object(btn).disabled || this.disabled
      },
      onButtonClick (button) {
        this.$emit('buttonclick', button)
        if (this.toggled !== undefined && this.toggled !== button) {
          this.$emit('togglechange', button)
        }
      }
    }
  }
</script>