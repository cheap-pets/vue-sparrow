<template>
  <div>
    <div v-if="barPosition !== 'top'" class="expand-panel" :expanded="expandState">
      <slot></slot>
    </div>
    <slot name="trigger">
      <div class="bar" justify-content="center">
        <a class="text-link" toggle-type="expand" :expanded="expandState" @click="onToggle">
          {{ expandState ? collapseTitle : expandTitle }}
        </a>
      </div>
    </slot>
    <div v-if="barPosition === 'top'" class="expand-panel" :expanded="expandState">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SuExpandPanel',
    props: [ 'expanded', 'barPosition', 'expandTitle', 'collapseTitle' ],
    data () {
      return {
        expandState: this.expanded
      }
    },
    methods: {
      onToggle () {
        this.expandState = this.expandState ? undefined : 'expanded'
      }
    },
    watch: {
      expanded (val) {
        this.expandState = val
      }
    }
  }
</script>
