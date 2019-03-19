import isString from 'lodash.isstring'

export default {
  name: 'SuButtonGroup',
  props: ['disabled', 'buttonWidth', 'buttons', 'toggleGroup'],
  data () {
    return {
      btns: []
    }
  },
  provide () {
    return {
      buttonGroup: this
    }
  },
  methods: {
    refreshBtns (val) {
      if (Array.isArray(val)) {
        this.btns = val.map(item => Object.assign({ toggled: undefined }, isString(item) ? { text: item } : item))
      }
    },
    tapButton (button) {
      if (this.toggleGroup !== undefined) {
        this.btns.forEach(btn => { btn.toggled = btn === button ? true : undefined })
      }
      this.$emit('click', button)
    },
    renderButtons (h) {
      return (
        <div class="btn-group">
          {
            this.$slots.default
              ? this.$slots.default
              : (
                this.btns
                  ? this.btns.map(btn => (
                    <su-button option={ btn } onClick={ () => { this.tapButton(btn) } }></su-button>
                  ))
                  : ''
              )
          }
        </div>
      )
    }
  },
  watch: {
    buttons (val) {
      this.refreshBtns(val)
    }
  },
  mounted () {
    this.refreshBtns(this.buttons)
  },
  render (h) {
    return (
      this.$slots.dropdown
        ? (
          <div class="dropdown-group" sparrow-popup>
            { this.renderButtons(h) }
            { this.$slots.dropdown }
          </div>
        )
        : this.renderButtons(h)
    )
  }
}
