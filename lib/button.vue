<template>
  <button @click="onClick" :class="btnClass">
    <i :class="iconClass" v-if="iconClass"></i>
    <slot></slot>
  </button>
</template>

<script>
  import isString from 'lodash.isstring'

  export default {
    name: 'SuButton',
    props: [ 'width', 'icon', 'buttonType', 'toggleType' ],
    computed: {
      btnOption () {
        return isString(this.option) ? { text: this.option } : this.option || {}
      },
      btnClass () {
        const { buttonClass, primary, secondary, danger } = this.btnOption
        const cls = this.buttonClass || buttonClass
        let v = ['btn']
        if (cls) v = v.concat(cls.split(' '))
        if (this.btnIconClass && !this.btnText) v = v.concat(this.btnIconClass.split(' '))
        if (this.primary || primary) v.push('btn-primary')
        else if (this.secondary || secondary) v.push('btn-secondary')
        else if (this.danger || danger) v.push('btn-danger')
        else v.push('btn-primary', 'btn-outline')
        return v
      },
      btnStyle () {
        const width = this.width || this.btnOption.width
        const v = {}
        if (width) v.width = width + (!isNaN(width) ? 'px' : '')
        return v
      },
      btnIconClass () {
        return this.iconClass || this.btnOption.iconClass
      },
      btnText () {
        return this.text || this.btnOption.text
      },
      isDisabled () {
        return this.disabled === undefined ? this.btnOption.disabled : this.disabled
      },
      isToggled () {
        return this.toggled === undefined ? this.btnOption.toggled : this.toggled
      }
    },
    methods: {
      onClick () {
        this.$emit('click')
      }
    }
  }
</script>
