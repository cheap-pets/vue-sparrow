<template>
  <div class="list-group">
    <slot :items="items">
      <su-list-item v-for="(item,index) in listItems" :key="index"
        :item="item" :multiple="multiple" :iconField="iconField" :textField="textField" :checkField="checkField" @clickitem="clickItem" />
    </slot>
  </div>
</template>

<script>
  import isString from 'lodash.isstring'
  import ListItem from './list-item.vue'

  export default {
    name: 'SuList',
    props: [ 'items', 'multiple', 'textField', 'checkField', 'iconField', 'selectable' ],
    data () {
      return {
        val: '',
        listItems: []
      }
    },
    computed: {
    },
    components: {
      'su-list-item': ListItem
    },
    methods: {
      refreshItems (val) {
        if (Array.isArray(val)) {
          this.listItems = val.map(item => {
            return Object.assign(
              { _ref: item },
              { [this.checkField || 'checked']: false },
              isString(item) ? { text: item } : item)
          })
        }
      },
      getItemText (item) {
        return isString(item)
          ? item
          : (this.textField ? item[this.textField] : item['text'] || item['name']) || ''
      },
      clickItem (item) {
        if (Object(this.selectable).toString() !== 'false') {
          const p = this.checkField || 'checked'
          if (this.multiple) {
            item[p] = !item[p]
            const ret = []
            this.listItems.forEach(loopItem => {
              if (loopItem[p]) ret.push(loopItem._ref)
            })
            this.val = ret.map(this.getItemText).join(',')
            this.$emit('select', ret)
          } else {
            this.listItems.forEach(loopItem => {
              loopItem[p] = item === loopItem
            })
            this.val = this.getItemText(item)
            this.$emit('select', item)
          }
        }
        this.$emit('clickitem', item._ref)
      },
      input (event) {
        this.$emit('input', event)
      }
    },
    watch: {
      options (val) {
        this.refreshItems(val)
      },
      value (val) {
        this.val = val
      }
    },
    mounted () {
      this.val = this.value
      this.refreshItems(this.items)
    }
  }
</script>
