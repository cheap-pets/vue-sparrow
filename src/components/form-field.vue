<template>
  <div class="form-field">
    <slot name="label">
      <label v-if="label !== undefined" :style="{ width: labelWidth }">{{ label }}</label>
    </slot>
    <slot>
      <input no-border type="text" :value="inputValue" :readonly="readonly" @input="onInput">
    </slot>
    <slot name="postfix">
      <div v-if="postfixLabel" :style="{ width: postfixWidth }">
        {{ postfixLabel }}
      </div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'SuFormField',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: [ 'label', 'value', 'readonly', 'labelWidth', 'postfixLabel', 'postfixWidth' ],
    data () {
      return {
        inputValue: null
      }
    },
    watch: {
      value (v) {
        this.inputValue = v
      }
    },
    mounted () {
      this.inputValue = this.value
    },
    methods: {
      onInput () {
        this.inputValue = event.target.value
        this.$emit('input', event, this)
        this.$emit('change', event.target.value, this)
      }
    }
  }
</script>
