<template>
  <div class="modal-mask" justify-content="center" :style="{ zIndex: zIndex }" @popupopen="onShow" @popupclose="onHide">
    <div class="dialog" :style="{ width: width, height: height }">
      <slot name="header">
        <div v-if="title" class="dialog-header" :dlg-title="title">
          <a toggle-type="close" popup-action="close" />
        </div>
      </slot>
      <div class="dialog-body">
        <slot />
      </div>
      <slot name="footer">
        <div v-if="buttons" class="dialog-footer">
          <button v-for="(btn, index) in btns" :key="index" :class="['btn', btn.className]" @click="onButtonClick(btn)">
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
    name: 'SuDialog',
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
