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

let _primaryColor, _successColor, _warningColor, _dangerColor, _infoColor

const variables = {
  /* button */
  buttonHeight: 32,
  buttonLineHeight: 20,
  buttonBorderRadius: 2,
  buttonShadow: 1,
  buttonDefaultColor: grey[7],
  buttonDefaultHoverColor: grey[6],
  buttonDefaultActiveColor: grey[8],
  buttonDefaultDisabledColor: grey[4],

  /* input */
  inputHeight: 32,
  inputBorderRadius: 2,
  inputBorderColor: grey[5],
  inputReadonlyBackground: '#feffe6',
  inputDisabledBackground: grey[1],

  /* text colours */
  textBlack: grey[9],
  textGrey: grey[7],
  textDarkGrey: grey[8],
  textLightGrey: grey[6],
  textDark: 'rgba(0, 0, 0, .7)',
  textHalfDark: 'rgba(0, 0, 0, .35)',
  textQuarterDark: 'rgba(0, 0, 0, .175)',
  textLight: 'rgba(255, 255, 255, .7)',
  textHalfLight: 'rgba(255, 255, 255, .35)',
  textQuarterLight: 'rgba(255, 255, 25, .175)',

  /* margin, padding */
  marginUnitSize: 8
}

function setButtonColors (buttonType, colors) {
  variables[`button${buttonType}Color`] = colors[5]
  variables[`button${buttonType}HoverColor`] = colors[4]
  variables[`button${buttonType}ActiveColor`] = colors[6]
  variables[`button${buttonType}DisabledColor`] = colors[2]
}

Object.defineProperties(variables, {
  primaryColor: {
    get () {
      return _primaryColor
    },
    set (v) {
      _primaryColor = v
      const colors = generate(v)
      setButtonColors('Primary', colors)
      this.inputFocusShadowColor = colors[2]
      this.inputHoverBorderColor = colors[5]
    }
  },
  successColor: {
    get () {
      return _successColor
    },
    set (v) {
      _successColor = v
      const colors = generate(v)
      setButtonColors('Submit', colors)
    }
  },
  warningColor: {
    get () {
      return _warningColor
    },
    set (v) {
      _warningColor = v
    }
  },
  dangerColor: {
    get () {
      return _dangerColor
    },
    set (v) {
      _dangerColor = v
      const colors = generate(v)
      setButtonColors('Danger', colors)
      this.inputInvalidShadowColor = colors[2]
      this.inputInvalidBorderColor = colors[5]
    }
  },
  infoColor: {
    get () {
      return _infoColor
    },
    set (v) {
      _infoColor = v
    }
  }
})

Object.assign(variables, {
  primaryColor: '#1890ff',
  successColor: '#52c41a',
  warningColor: '#fa8c16',
  dangerColor: '#fa541c',
  infoColor: '#2ccdfa'
})

export default variables
