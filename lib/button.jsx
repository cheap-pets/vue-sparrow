export default {
  name: 'SuButton',
  props: {
    buttonShape: {
      type: String,
      default: 'rectangle',
      validator (value) {
        return ['rectangle', 'round'].indexOf(value) !== -1
      }
    },
    buttonStyle: {
      type: String,
      default: 'normal',
      validator (value) {
        return ['normal', 'outline', 'text'].indexOf(value) !== -1
      }
    },
    buttonType: {
      type: String,
      default: 'normal',
      validator (value) {
        return ['normal', 'cancel', 'primary', 'secondary', 'success', 'danger'].indexOf(value) !== -1
      }
    },
    icon: String,
    caption: String,
    width: String
  },
  computed: {
    iconElementExist () {
      return this.icon && (this.caption || this.$slots.default)
    },
    classes () {
      const classes = ['btn']
      const { buttonShape, buttonStyle, buttonType, icon } = this
      let styleClass, typeClass
      if (buttonType === 'normal') {
        styleClass = 'outline'
        typeClass = 'primary'
      }
      if (['outline', 'text'].includes(buttonStyle)) styleClass = buttonStyle
      if (['primary', 'secondary', 'success', 'danger'].includes(buttonType)) typeClass = buttonType
      if (buttonShape === 'round') classes.push('oval')
      if (typeClass) classes.push(`btn-${typeClass}`)
      if (styleClass) classes.push(`btn-${styleClass}`)
      if (icon && !this.iconElementExist) classes.push(icon)
      return classes
    },
    styles () {
      return {
        width: this.width
      }
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  },
  render (h) {
    return (
      <button onClick={ this.onClick } class={ this.classes } style={ this.styles }>
        {
          this.iconElementExist
            ? <i class={this.icon} />
            : undefined
        }
        {
          this.$slots.default
            ? (
              this.iconElementExist
                ? <span>{ this.$slots.default }</span>
                : this.$slots.default
            )
            : (
              this.caption
                ? <span>{ this.caption }</span>
                : undefined
            )
        }
      </button>
    )
  }
}
