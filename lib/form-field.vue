<template>
  <div class="form-field">
    <slot name="label">
      <label v-if="label !== undefined" :style="{ width: labelWidth }">{{ label }}</label>
    </slot>
    <slot>
      <input type="text" v-model="value" :readonly="readonly" no-border>
    </slot>
    <slot name="postfix">
      <div v-if="postfixLabel" :style="{ width: postfixWidth }">{{ postfixLabel }}</div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'SuFormField',
    props: [ 'label', 'value', 'readonly', 'labelWidth', 'postfixLabel', 'postfixWidth' ],
    model: {
      prop: 'value',
      event: 'input'
    }
  }
</script>
