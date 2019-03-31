<template>
  <div class="modal-mask" justify-content="center" :style="{ zIndex: this.zIndex }" @popupopen='onShow' @popupclose='onHide'>
    <div class="dialog" :style="{ width: this.width, height: this.height }">
      <slot name="header">
        <div class="dialog-header" v-if="title" :dlg-title="title">
          <a toggle-type="close" popup-action="close"></a>
        </div>
      </slot>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <slot name="footer">
        <div class="dialog-footer" v-if="buttons">
          <button v-for="btn in btns" :key="btn.caption" class="btn" :class="btn.className" @click="onButtonClick(btn)">
            {{ btn.caption }}
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  import { show, hide } from 'sparrow-popup'
  
  export default {
    name: 'su-dialog',
    props: ['zIndex', 'height', 'width', 'title', 'buttons', 'primaryButton'],
    computed: {
      btns () {
        const { buttons, primaryButton } = this
        const primaryBtn = (primaryButton || '').trim()
        return buttons
          ? buttons.split(',').map(item => {
            const caption = item.trim()
            return {
              caption,
              className: primaryBtn === caption ? 'btn-primary' : 'btn-outline'
            }
          })
          : null
      }
    },
    methods: {
      onButtonClick (btn) {
        this.$emit('buttonclick', btn.caption, this)
      },
      onShow (event) {
        this.$emit('show', event, this)
      },
      onHide (event) {
        this.$emit('hide', event, this)
      },
      show () {
        setTimeout(() => {
          show(this.$el)
        }, 10)
      },
      hide () {
        setTimeout(() => {
          hide(this.$el)
        }, 10)
      }
    }
  }
</script>
