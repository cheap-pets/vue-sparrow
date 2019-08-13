<template>
  <a class="list-group-item"
    :class="{ active: active }"
    :checked="itemChecked"
    :disabled="itemDisabled"
    :toggle-type="itemToggleType"
    @click="onItemClick">
    <slot>
      <span v-if="itemIcon" :class="itemIcon" />
      <span v-if="itemLabel">{{ itemLabel }}</span>
    </slot>
  </a>
</template>

<script>
  import isString from 'lodash.isstring'

  export default {
    name: 'SuListItem',
    props: {
      active: Boolean,
      checked: Boolean,
      disabled: Boolean,
      fields: Object,
      icon: String,
      item: [String, Object],
      label: String,
      toggleType: String
    },
    computed: {
      itemIcon () {
        return this.getFieldValue('icon')
      },
      itemLabel () {
        return this.getFieldValue('label') || (isString(this.item) ? this.item : undefined)
      },
      itemChecked () {
        return this.getFieldValue('checked')
      },
      itemDisabled () {
        return this.getFieldValue('disabled')
      },
      itemToggleType () {
        return this.toggleType || (this.itemChecked ? 'check' : undefined)
      }
    },
    methods: {
      getFieldValue (field) {
        field = Object(this.fields)[field] || field
        return this[field] || (this.item ? this.item[field] : undefined)
      },
      onItemClick () {
        if (!this.itemDisabled) this.$emit('itemclick')
      }
    }
  }
</script>
