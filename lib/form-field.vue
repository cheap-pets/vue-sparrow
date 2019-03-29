<template>
  <div class="form-field">
    <slot name="label">
      <label :style="{ width: labelWidth }">{{ label }}</label>
    </slot>
    <slot>
      <input type="text" v-model="value" :readonly="readonly" no-border>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'SuFormField',
    props: [ 'label', 'value', 'readonly', 'labelWidth' ],
    model: {
      prop: 'value',
      event: 'input'
    }
  }
</script>
