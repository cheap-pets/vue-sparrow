import { show, hide } from 'sparrow-popup'
import emit from './emit-event'

function broadcast (children, eventName) {
  ['dialogComponent', 'headComponent', 'bodyComponent', 'footComponent'].forEach(item => {
    const el = Object(children[item]).$el
    if (el) emit(el, eventName)
  })
}

class Dialog {
  constructor () {
    const options = { ...arguments[0] }
    const data = {
      title: '',
      danger: false,
      buttons: undefined,
      primaryButton: undefined,
      params: undefined,
      zIndex: undefined,
      width: undefined,
      height: undefined,
      ...options.data
    }
    ;['title', 'buttons', 'primaryButton', 'danger', 'params', 'zIndex', 'width', 'height'].forEach(prop => {
      if (options[prop] !== undefined) data[prop] = options[prop]
      delete options[prop]
    })
    const { components = {}, dialogComponent, headComponent, bodyComponent, footComponent } = options
    if (dialogComponent) components['slot-dialog'] = dialogComponent
    if (headComponent) components['slot-dialog-head'] = headComponent
    if (bodyComponent) components['slot-dialog-body'] = bodyComponent
    if (footComponent) components['slot-dialog-foot'] = footComponent

    delete options.headComponent
    delete options.bodyComponent
    delete options.footComponent
    delete options.components

    const defaultMixin = {
      data,
      computed: {
        maskStyle () {
          const style = {}
          if (this.zIndex) style.zIndex = this.zIndex
          return style
        },
        dialogStyle () {
          const style = {}
          if (this.width) style.width = this.width
          if (this.height) style.height = this.height
          return style
        },
        btns () {
          const { buttons, primaryButton, danger } = this
          const primaryBtn = (primaryButton || '').trim()
          const primaryCls = danger ? 'btn-danger' : 'btn-primary'
          return this.buttons
            ? buttons.split(',').map(item => {
              const caption = item.trim()
              return {
                caption,
                className: primaryBtn === caption ? primaryCls : 'btn-grey btn-outline'
              }
            })
            : null
        }
      },
      methods: {
        show (options = {}) {
          for (let key of Object.keys(options)) {
            this[key] = options[key]
          }
          if (!this.$el && !this.$parent) {
            this.$mount()
            document.body.appendChild(this.$el)
          }
          setTimeout(() => {
            show(this.$el)
            const btnEl = this.$el.querySelector('.dialog-footer > .btn')
            if (btnEl) btnEl.focus()
          }, 10)
        },
        hide (event) {
          this.$emit('hide')
          broadcast(this.$refs, 'dialoghide')
          hide(this.$el, true)
        },
        onButtonClick (btn) {
          this.$emit('buttonclick', btn.caption)
        },
        emitCustomEvent (params) {
          this.$emit('customevent', params)
        },
        onShow () {
          this.$emit('show')
          broadcast(this.$refs, 'dialogshow')
        },
        onHide (event) {
          event.preventDefault()
          if (this._beforeDialogClose) {
            this._beforeDialogClose(() => {
              this.hide()
            })
          } else this.hide()
        }
      },
      beforeCreate () {
        this._beforeDialogClose = this.$options.beforeDialogClose
      },
      render (h) {
        return (
          <div class="modal-mask" style={ this.maskStyle } onPopupopen={ this.onShow } onPopupclose={ this.onHide }>
            {
              this.$options.components['slot-dialog']
                ? <slot-dialog class={['dialog', this.danger ? 'danger' : '']} style={ this.dialogStyle } ref="dialogComponent"></slot-dialog>
                : (
                  <div class={['dialog', this.danger ? 'danger' : '']} style={ this.dialogStyle }>
                    {
                      this.$options.components['slot-dialog-head']
                        ? <slot-dialog-head class="dialog-header" dlg-title={ this.title } ref="headComponent"></slot-dialog-head>
                        : (
                          <div class="dialog-header" dlg-title={ this.title }>
                            <a toggle-type="close" popup-action="close"></a>
                          </div>
                        )
                    }
                    {
                      this.$options.components['slot-dialog-body']
                        ? <slot-dialog-body class="dialog-body" params={ this.params } onCustomevent={ this.emitCustomEvent } ref="bodyComponent"></slot-dialog-body>
                        : <div class="dialog-body"></div>
                    }
                    {
                      this.$options.components['slot-dialog-foot']
                        ? <slot-dialog-foot class="dialog-footer" btns={ this.btns} ref="footComponent"></slot-dialog-foot>
                        : (
                          this.btns
                            ? (
                              <div class="dialog-footer">
                                {
                                  this.btns.map(btn => (
                                    <button class={['btn', btn.className]}
                                      domPropsInnerHTML={ btn.caption } onClick={ () => { this.onButtonClick(btn) }}>
                                    </button>
                                  ))
                                }
                              </div>
                            )
                            : ''
                        )
                    }
                  </div>
                )
            }
          </div>
        )
      }
    }

    return new Vue({
      mixins: [ defaultMixin ],
      components,
      ...options
    })
  }
}

Dialog._messageDialog = new Dialog({
  zIndex: 500,
  bodyComponent: {
    props: [ 'params' ],
    render (h) {
      return (
        <div domPropsInnerHTML={`${Object(this.params).message}`} style="line-height: 24px;"></div>
      )
    }
  },
  primaryButton: '确定'
})

Dialog.messageBox = function ({ title = '提示', message, buttons = '确定', primaryButton, danger, callback }) {
  const dlg = this._messageDialog
  dlg.$off('buttonclick')
  dlg.show({
    title,
    buttons,
    primaryButton,
    danger,
    params: { message }
  })
  dlg.$once('buttonclick', function (button) {
    if (callback) callback(button)
    this.hide()
  })
}

Dialog.alert = function (message, callback) {
  this.messageBox({
    message,
    callback
  })
}

Dialog.confirm = function (message, callback) {
  this.messageBox({
    title: '确认提示',
    buttons: '确定,取消',
    message,
    callback
  })
}

Dialog.warn = function warn (message, callback) {
  this.messageBox({
    title: '确认警告',
    buttons: '确定,取消',
    danger: true,
    message,
    callback
  })
}

export default Dialog
