<template>
  <div class="form-group" :class="{ important: important }">
    <label v-if="label" :style="labelStyle">{{ label }}</label>
    <slot>
      <input type="text" :value="value" @input="input" :placeholder="placeholder">
    </slot>
  </div>
</template>

<script>
  export default {
    props: [ 'labelWidth', 'important', 'label', 'value', 'placeholder' ],
    computed: {
      labelStyle () {
        const width = this.labelWidth
        const v = {}
        if (width) v.width = width
        return v
      }
    },
    methods: {
      input (event) {
        this.$emit('input', event)
      }
    }
  }
</script>
