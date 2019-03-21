export default {
  name: 'SuButton',
  props: [ 'icon', 'type' ],
  computed: {
    btnClass () {
      let cls = ['btn']
      if (!this.$slots.default && this.icon) cls.push(this.icon)
      if (['primary', 'secondary', 'success', 'danger'].includes(this.type)) {
        cls.push(`btn-${this.type}`)
      } else if (!this.type) {
        cls.push('btn-primary', 'btn-outline')
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
        { this.$slots.default ? this.$slots.default : undefined }
      </button>
    )
  }
}
