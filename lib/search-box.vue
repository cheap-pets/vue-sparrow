<template>
  <div class="input-box" :style="{ width: width }">
    <span class="icon icon-search" />
    <input type="text" :disabled="disabled" :placeholder="placeholder" @input="onInput" @focus="select">
  </div>
</template>

<script>
  export default {
    name: 'SuSearchBox',
    props: [ 'disabled', 'placeholder', 'width' ],
    methods: {
      onInput (e) {
        if (this.disabled) return
        if (this.__timer) clearTimeout(this.__timer)
        this.__timer = setTimeout(() => {
          this.$emit('search', e.target.value)
        }, 500)
      },
      select (e) {
        if (this.disabled) return
        e.target.select()
        this.$emit('focus')
      }
    }
  }
</script>
