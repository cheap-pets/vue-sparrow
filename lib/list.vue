<template>
  <div class="list-group">
    <slot>
      <su-list-item v-for="(item, index) in items" :key="index" :item="item" :popup-action="itemPopupAction"
         :fields="fields" v-if="items && items.length" @itemclick="onItemClick(item)" :active="item === activeItem">
      </su-list-item>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'SuList',
    props: [ 'items', 'fields', 'activeItem', 'selectable', 'itemPopupAction' ],
    model: {
      prop: 'activeItem',
      event: 'select'
    },
    methods: {
      onItemClick (item) {
        this.$emit('itemclick', item)
        if (this.selectable && item !== this.activeItem) this.$emit('select', item)
      },
      input (event) {
        this.$emit('input', event)
      }
    }
  }
</script>
