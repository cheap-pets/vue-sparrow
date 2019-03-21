<template>
  <div class="dropdown-group" sparrow-popup>
    <su-button-group v-if="split">
      <su-button :buttonType="buttonType" :buttonStyle="buttonStyle" :icon="icon" @click="onClick">{{ text }}</su-button>
      <su-button :buttonType="buttonType" :buttonStyle="buttonStyle" toggle-type="expand" popup-action="toggle"></su-button>
    </su-button-group>
    <su-button v-else :buttonType="buttonType" :buttonStyle="buttonStyle"
      :icon="icon" toggle-type="expand" popup-action="toggle" @click="onClick">{{ text }}</su-button>
    <div class="dropdown list-group" :dropdown-align="dropdownAlign || 'justify'" :style="{ width: dropdownWidth }">
      <slot>
        <su-list-item v-for="(item, index) in items" :key="index" :item="item" :fields="fields"
          v-if="items && items.length" popup-action="close" @itemclick="onItemClick(item)">
        </su-list-item>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SuDropdownButton',
    props: [ 'icon', 'text', 'buttonType', 'buttonStyle', 'split', 'items', 'fields', 'dropdownAlign', 'dropdownWidth' ],
    methods: {
      onClick () {
        this.$emit('click')
      },
      onItemClick (item) {
        this.$emit('itemclick')
      }
    }
  }
</script>
