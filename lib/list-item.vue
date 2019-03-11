<template>
  <a class="list-group-item" @click="clickItem(item)" :class="{ active: active }" :popup-action="popupAction" :toggle-type="toggleType" :checked="checked" :disabled="item.disabled">
    <slot :item="item">
      <span v-if="icon" :class="icon"></span>
      <span v-if="text">{{ text }}</span>
    </slot>
  </a>
</template>

<script>
export default {
  props: [ 'textField', 'iconField', 'checkField', 'item', 'multiple', 'popupAction' ],
  computed: {
    active () {
      return this.item.checked
    },
    text () {
      return (this.textField ? this.item[this.textField] : this.item['text'] || this.item['name']) || ''
    },
    icon () {
      return this.item[this.iconField || 'icon']
    },
    checked () {
      return this.item[this.checkField || 'checked'] ? 'true' : undefined
    },
    toggleType () {
      return this.multiple ? 'check' : undefined
    }
  },
  methods: {
    clickItem (item) {
      if (!item.disabled) this.$emit('clickitem', item)
    }
  }
}
</script>
