<template>
  <div class="btn-group" :class="grpClass">
    <slot>
      <su-button v-if="btns" v-for="(btn,index) in btns" :key="index" :option="btn" @click="tapButton(btn)"></su-button>
    </slot>
  </div>
</template>

<script>
  import isString from 'lodash.isstring'

  export default {
    name: 'SuButtonGroup',
    props: ['disabled', 'groupClass', 'buttonWidth', 'buttons', 'toggleGroup'],
    data () {
      return {
        btns: []
      }
    },
    computed: {
      grpClass () {
        let v = ['btn-group']
        if (this.groupClass) v = v.concat(this.groupClass.split(' '))
        return v
      }
    },
    methods: {
      refreshBtns (val) {
        if (Array.isArray(val)) {
          this.btns = val.map(item => Object.assign({ toggled: undefined }, isString(item) ? { text: item } : item))
        }
      },
      tapButton (button) {
        if (this.toggleGroup !== undefined) {
          this.btns.forEach(btn => { btn.toggled = btn === button ? true : undefined })
        }
        this.$emit('click', button)
      }
    },
    watch: {
      buttons (val) {
        this.refreshBtns(val)
      }
    },
    mounted () {
      this.refreshBtns(this.buttons)
    }
  }
</script>
