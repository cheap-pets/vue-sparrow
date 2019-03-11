import { show, hide } from 'sparrow-popup'

class Dialog {
  constructor () {
    const options = { ...arguments[0] }
    const data = {
      title: '',
      danger: false,
      buttons: undefined,
      primaryButton: undefined,
      params: undefined,
      ...options.data
    }
    ;['title', 'buttons', 'primaryButton', 'danger', 'params', 'zIndex', 'width', 'height'].forEach(prop => {
      if (options[prop] !== undefined) data[prop] = options[prop]
      delete options[prop]
    })
    const { components, bodyComponent } = options
    delete options.data
    delete options.bodyComponent
    delete options.components
    return new Vue({
      ...options,
      data,
      components: {
        ...components,
        'slot-dialog-body': bodyComponent
      },
      computed: {
        maskStyle () {
          return { zIndex: this.zIndex }
        },
        dialogStyle () {
          const { width, height } = this
          return { width, height }
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
          ['title', 'buttons', 'primaryButton', 'danger', 'params'].forEach(prop => {
            if (options[prop] !== undefined) this[prop] = options[prop]
          })
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
            <div class={['dialog', this.danger ? 'danger' : '']} style={ this.dialogStyle }>
              <div class="dialog-header" dlg-title={ this.title }>
                <a toggle-type="close" popup-action="close"></a>
              </div>
              <slot-dialog-body class="dialog-body" params={this.params} onCustomevent={ this.emitCustomEvent }></slot-dialog-body>
              {
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
              }
            </div>
          </div>
        )
      }
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
