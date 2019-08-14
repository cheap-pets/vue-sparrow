<template>
  <div class="list-group">
    <slot>
      <template v-if="items && items.length">
        <su-list-item v-for="(item, index) in items"
          :key="index"
          :item="item"
          :fields="fields"
          :active="item === activeItem"
          @itemclick="onItemClick(item)"
        />
      </template>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'SuList',
    model: {
      prop: 'activeItem',
      event: 'select'
    },
    props: [ 'items', 'fields', 'activeItem', 'selectable' ],
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
