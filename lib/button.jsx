export default {
  name: 'SuButton',
  props: [ 'icon', 'buttonType', 'buttonStyle' ],
  computed: {
    btnClass () {
      const cls = ['btn']
      if (!this.$slots.default && this.icon) cls.push(this.icon)
      if (['primary', 'secondary', 'success', 'danger'].includes(this.buttonType)) {
        cls.push(`btn-${this.buttonType}`)
      } else if (!this.buttonType) {
        cls.push('btn-primary')
        if (!this.buttonStyle) cls.push('btn-outline')
      }
      if (this.buttonStyle) {
        cls.push(`btn-${this.buttonStyle}`)
      }
      return cls
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  },
  render (h) {
    return (
      <button onClick={ this.onClick } class={ this.btnClass } >
        {
          this.$slots.default && this.icon
            ? <i class={this.icon}></i>
            : undefined
        }
        {
          this.$slots.default
            ? <span>{ this.$slots.default }</span>
            : undefined
        }
      </button>
    )
  }
}
