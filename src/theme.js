const { generate } = require('@ant-design/colors')

const grey = [ '#f2f2f2', '#e6e6e6', '#d9d9d9', '#cccccc', '#bfbfbf', '#b2b2b2', '#8c8c8c', '#666666', '#404040', '#1a1a1a' ]

let _primaryColor = '#1890ff'
let _secondaryColor = '#b2b2b2'
let _successColor = '#52c41a'
let _dangerColor = '#fa541c'

const theme = Object.defineProperties({}, {
  primaryColor: {
    get () {
      return _primaryColor
    },
    set (v) {
      _primaryColor = v
      const colors = generate(v)
      Object.assign(this, {
        primaryHoverColor: colors[4],
        primaryActiveColor: colors[6],
        primaryDisabledColor: colors[2],
        primaryShadowColor: colors[2]
      })
    }
  },
  secondaryColor: {
    get () {
      return _secondaryColor
    },
    set (v) {
      _secondaryColor = v
    }
  },
  successColor: {
    get () {
      return _successColor
    },
    set (v) {
      _successColor = v
    }
  },
  dangerColor: {
    get () {
      return _dangerColor
    },
    set (v) {
      _dangerColor = v
    }
  }
})

export default theme

const variables = {
  COLOR_PRIMARY: blue[5],
  COLOR_SECONDARY: grey[7],
  COLOR_SUCCESS: green[5],
  COLOR_DANGER: volcano[5],
  COLOR_WARNING: orange[5],

  SHADOW_COLOR_NORMAL: grey[4],
  SHADOW_COLOR_PRIMARY: blue[2],
  SHADOW_COLOR_SECONDARY: grey[4],
  SHADOW_COLOR_SUCCESS: green[2],
  SHADOW_COLOR_DANGER: volcano[2],

  BUTTON_SHADOW: 1,

  BUTTON_COLOR_NORMAL: grey[7],
  BUTTON_COLOR_NORMAL_HOVER: grey[6],
  BUTTON_COLOR_NORMAL_ACTIVE: grey[8],
  BUTTON_COLOR_NORMAL_DISABLED: grey[4],

  BUTTON_COLOR_PRIMARY: blue[5],
  BUTTON_COLOR_PRIMARY_HOVER: blue[4],
  BUTTON_COLOR_PRIMARY_ACTIVE: blue[6],
  BUTTON_COLOR_PRIMARY_DISABLED: blue[2],

  BUTTON_COLOR_SECONDARY: grey[7],
  BUTTON_COLOR_SECONDARY_HOVER: grey[6],
  BUTTON_COLOR_SECONDARY_ACTIVE: grey[8],
  BUTTON_COLOR_SECONDARY_DISABLED: grey[4],

  BUTTON_COLOR_SUBMIT: green[5],
  BUTTON_COLOR_SUBMIT_HOVER: green[4],
  BUTTON_COLOR_SUBMIT_ACTIVE: green[6],
  BUTTON_COLOR_SUBMIT_DISABLED: green[2],

  BUTTON_COLOR_DANGER: volcano[5],
  BUTTON_COLOR_DANGER_HOVER: volcano[4],
  BUTTON_COLOR_DANGER_ACTIVE: volcano[6],
  BUTTON_COLOR_DANGER_DISABLED: volcano[2],

  INPUT_BORDER_COLOR: grey[7],
  INPUT_COLOR_READONLY: yellow[0],
  INPUT_COLOR_DISABLED: grey[1],

  INPUT_BORDER_RADIUS: 2,
  INPUT_HEIGHT: 32,

  BAR_HEIGHT: 40,

  BORDER_COLOR_DEFAULT: grey[5],

  TEXT_COLOR_DEFAULT: grey[9],
  TEXT_COLOR_GREY: grey[7],
  TEXT_COLOR_GREY_DARK: grey[8],
  TEXT_COLOR_GREY_LIGHT: grey[6],

  TEXT_COLOR_DARK: 'rgba(0, 0, 0, .7)',
  TEXT_COLOR_HALF_DARK: 'rgba(0, 0, 0, .35)',
  TEXT_COLOR_QUARTER_DARK: 'rgba(0, 0, 0, .175)',
  TEXT_COLOR_LIGHT: 'rgba(255, 255, 255, .7)',
  TEXT_COLOR_HALF_LIGHT: 'rgba(255, 255, 255, .35)',
  TEXT_COLOR_QUARTER_LIGHT: 'rgba(255, 255, 25, .175)',

  DIALOG_BORDER_RADIUS: 0,

  DROPDOWN_BORDER_RADIUS: 0,

  LIST_ITEM_HEIGHT: 40
}

module.exports = variables
