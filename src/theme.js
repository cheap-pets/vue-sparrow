const { generate } = require('@ant-design/colors')

const grey = [
  '#f2f2f2',
  '#e6e6e6',
  '#d9d9d9',
  '#cccccc',
  '#bfbfbf',
  '#b2b2b2',
  '#8c8c8c',
  '#666666',
  '#404040',
  '#1a1a1a'
]

let _primaryColor, _secondaryColor, _successColor, _dangerColor

function setColors (colors, { button }) {
  Object.assign(button, {
    color: colors[5],
    hoverColor: colors[4],
    activeColor: colors[6],
    disabledColor: colors[2]
  })
}

const theme = {
  defaultButton: {
    color: grey[7],
    hoverColor: grey[6],
    activeColor: grey[8],
    disabledColor: grey[4]
  },
  primaryButton: {},
  secondaryButton: {},
  submitButton: {},
  dangerButton: {},
  input: {
    borderColor: grey[5],
    readonlyBackground: '#feffe6',
    disabledBackground: grey[1]
  },
  text: {}
}

Object.defineProperties(theme, {
  primaryColor: {
    get () {
      return _primaryColor
    },
    set (v) {
      _primaryColor = v
      const colors = generate(v)
      setColors(colors, { button: this.primaryButton })
      Object.assign(this.input, {
        focusShadowColor: colors[2],
        hoverBorderColor: colors[5]
      })
    }
  },
  secondaryColor: {
    get () {
      return _secondaryColor
    },
    set (v) {
      _secondaryColor = v
      const colors = generate(v)
      setColors(colors, { button: this.secondaryButton })
    }
  },
  successColor: {
    get () {
      return _successColor
    },
    set (v) {
      _successColor = v
      const colors = generate(v)
      setColors(colors, { button: this.submitButton })
    }
  },
  dangerColor: {
    get () {
      return _dangerColor
    },
    set (v) {
      _dangerColor = v
      const colors = generate(v)
      setColors(colors, { button: this.dangerButton })
      Object.assign(this.input, {
        invalidShadowColor: colors[2],
        invalidBorderColor: colors[5]
      })
    }
  }
})

Object.assign(theme, {
  primaryColor: '#1890ff',
  secondaryColor: '#b2b2b2',
  successColor: '#52c41a',
  dangerColor: '#fa541c'
})

export default theme
