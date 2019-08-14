<template>
  <div class="list-group-header"
    :class="{ active: active }"
    :checked="itemChecked"
    :disabled="itemDisabled"
    :toggle-type="itemToggleType"
    @click="onItemClick">
    <slot>
      <span v-if="itemIcon" :class="itemIcon" />
      <span v-if="itemLabel">{{ itemLabel }}</span>
    </slot>
  </div>
</template>

<script>
  import Item from './list-item.vue'

  export default {
    name: 'SuListHeader',
    mixins: [Item],
    methods: {
      onItemClick () {
        if (!this.itemDisabled) this.$emit('itemclick')
      }
    }
  }
</script>
