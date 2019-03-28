<template>
  <a class="list-group-item" :class="{ active: active }" :checked="checkedValue"
    @click="onItemClick" :toggle-type="tgType" :popup-action="popupAction">
    <slot>
      <span v-if="iconValue" :class="iconValue"></span>
      <span v-if="labelValue">{{ labelValue }}</span>
    </slot>
  </a>
</template>

<script>
  import isString from 'lodash.isstring'

  export default {
    name: 'SuListItem',
    props: [ 'fields', 'item', 'icon', 'label', 'checked', 'active', 'disabled', 'popupAction', 'toggleType' ],
    computed: {
      iconValue () {
        return this.getFieldValue('icon')
      },
      labelValue () {
        return this.getFieldValue('label') || (isString(this.item) ? this.item : undefined)
      },
      checkedValue () {
        return this.getFieldValue('checked')
      },
      disabledValue () {
        return this.getFieldValue('disabled')
      },
      tgType () {
        return this.toggleType || (this.checkedValue ? 'check' : undefined)
      }
    },
    methods: {
      getFieldValue (field) {
        return this[field] || Object(this.item)[Object(this.fields)[field] || field]
      },
      onItemClick () {
        if (!this.disabledValue) this.$emit('itemclick')
      }
    }
  }
</script>
