<template>
  <div class="dropdown-group" sparrow-popup>
    <su-button-group v-if="split">
      <su-button
        :disabled="disabled"
        :button-type="buttonType"
        :button-style="buttonStyle"
        :icon="icon" @click="onClick">
        {{ text }}
      </su-button>
      <su-button
        :disabled="disabled"
        :button-type="buttonType"
        :button-style="buttonStyle"
        toggle-type="expand"
        popup-action="toggle" />
    </su-button-group>
    <su-button
      v-else
      :disabled="disabled"
      :button-type="buttonType"
      :button-style="buttonStyle"
      :icon="icon"
      toggle-type="expand"
      popup-action="toggle"
      @click="onClick">
      {{ text }}
    </su-button>
    <div
      v-if="!disabled"
      class="dropdown list-group"
      :dropdown-align="dropdownAlign || 'justify'"
      :style="{ width: dropdownWidth }">
      <slot>
        <templte v-if="items && items.length">
          <su-list-item
            v-for="(item, index) in items"
            :key="index"
            :item="item"
            :fields="fields"
            popup-action="close"
            @itemclick="onItemClick(item)" />
        </templte>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SuDropdownButton',
    props: {
      icon: String,
      text: String,
      split: Boolean,
      items: Array,
      fields: Object,
      disabled: Boolean,
      buttonType: String,
      buttonStyle: String,
      dropdownAlign: String,
      dropdownWidth: String
    },
    methods: {
      onClick () {
        this.$emit('click')
      },
      onItemClick (item) {
        this.$emit('itemclick', item)
      }
    }
  }
</script>
