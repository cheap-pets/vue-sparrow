<template>
  <div class="input-box" :class="boxStyle">
    <span class="icon icon-search"></span>
    <input type="text" :placeholder="placeholder" @input="inputUpdate" @focus="select">
  </div>
</template>

<script>
  export default {
    name: 'SuSearchBox',
    props: [ 'placeholder', 'width' ],
    computed: {
      boxStyle () {
        return {
          width: this.width ? (this.width + (!isNaN(this.width) ? 'px' : '')) : undefined
        }
      }
    },
    methods: {
      inputUpdate (e) {
        if (this.__timer) clearTimeout(this.__timer)
        this.__timer = setTimeout(() => {
          this.$emit('search', e.target.value)
        }, 500)
      },
      select (e) {
        e.target.select()
      }
    }
  }
</script>
