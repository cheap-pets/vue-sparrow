<template>
  <div class="input-box dropdown-group" :readonly="readonly" :style="comboStyle" sparrow-popup :popup-action="popupAction">
    <input type="text" :placeholder="placeholder" :value="val" :width="width" :readonly="readonly || isDropdownList" @input="input">
    <a toggle-type="expand" popup-action="toggle"></a>
    <slot>
      <div class="dropdown list-group" v-if="!readonly && items.length">
        <su-list-item v-for="(item,index) in items" :key="index" :popupAction="multiple ? 'none' : 'close'"
          :item="item" :multiple="multiple" :iconField="iconField" :textField="textField" :checkField="checkField" @clickitem="clickItem" />
      </div>
    </slot>
  </div>
</template>

<script>
  import isString from 'lodash.isstring'
  import ListItem from './list-item.vue'

  export default {
    props: [ 'value', 'width', 'iconClass', 'readonly', 'placeholder', 'dropdownStyle', 'multiple', 'options', 'textField', 'checkField', 'iconField' ],
    data () {
      return {
        val: '',
        items: []
      }
    },
    computed: {
      comboStyle () {
        return {
          width: this.width ? (this.width + (!isNaN(this.width) ? 'px' : '')) : undefined
        }
      },
      isDropdownList () {
        return this.dropdownStyle && this.dropdownStyle.toLowerCase() === 'dropdownlist'
      },
      popupAction () {
        return (this.readonly || !this.isDropdownList) ? 'none' : 'toggle'
      }
    },
    components: {
      'su-list-item': ListItem
    },
    methods: {
      refreshItems (val) {
        if (Array.isArray(val)) {
          this.items = val.map(item => {
            return Object.assign(
              { _ref: item },
              this.multiple ? { [this.checkField || 'checked']: false } : {},
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
        const p = this.checkField || 'checked'
        if (this.multiple) {
          item[p] = !item[p]
          const ret = []
          this.items.forEach(loopItem => {
            if (loopItem[p]) ret.push(loopItem._ref)
          })
          this.val = ret.map(this.getItemText).join(',')
          this.$emit('select', ret)
        } else {
          this.items.forEach(loopItem => {
            loopItem[p] = item === loopItem
          })
          this.val = this.getItemText(item)
          this.$emit('select', item)
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
      this.refreshItems(this.options)
    }
  }
</script>
