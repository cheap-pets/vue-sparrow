<template>
  <div class="btn-group">
    <slot>
      <su-button v-if="buttons" v-for="(btn,index) in buttons" :key="index" @click="onButtonClick(btn)"
        :icon="getBtnIcon(btn)" :type="getBtnType(btn)" :disabled="disabled" :toggled="toggled === btn">{{ getBtnText(btn) }}</su-button>
    </slot>
  </div>
</template>

<script>
  import isString from 'lodash.isstring'

  export default {
    name: 'SuButtonGroup',
    props: ['buttons', 'type', 'disabled', 'toggled'],
    model: {
      prop: 'toggled',
      event: 'togglechange'
    },
    methods: {
      getBtnType (btn) {
        return Object(btn).type || this.type
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