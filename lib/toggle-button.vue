<template>
  <button :class="btnClass" :toggle-type="toggleType" :disabled="disabled" @click="onClick" :popup-action="popAction"></button>
</template>

<script>
  export default {
    name: 'SuToggleButton',
    props: ['toggleType', 'disabled', 'primary', 'secondary', 'danger', 'popupAction'],
    inject: [ 'buttonGroup' ],
    computed: {
      popAction () {
        return this.popupAction || (Object(Object(this.buttonGroup).$slots).dropdown ? 'toggle' : undefined)
      },
      btnClass () {
        let v = ['btn']
        if (this.primary) v.push('btn-primary')
        else if (this.secondary) v.push('btn-secondary')
        else if (this.danger) v.push('btn-danger')
        else v.push('btn-primary', 'btn-outline')
        return v
      }
    },
    methods: {
      onClick () {
        if (!this.disabled) this.$emit('click')
      }
    }
  }
</script>
