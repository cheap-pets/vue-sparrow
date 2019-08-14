import Button from './components/button.jsx'
import DropdownButton from './components/dropdown-button.vue'
import ButtonGroup from './components/button-group.vue'
import ListItem from './components/list-item.vue'
import ListHeader from './components/list-header.vue'
import List from './components/list.vue'
import ComboBox from './components/combo-box.vue'
import ComboBoxOption from './components/combo-box-option.vue'
import SearchBox from './components/search-box.vue'
import Bar from './components/bar.vue'
import ColumnList from './components/column-list.vue'
import FormGroup from './components/form-group.vue'
import FormField from './components/form-field.vue'
import ExpandPanel from './components/expand-panel.vue'
import ModalDialog from './components/dialog.vue'
import Calendar from './components/calendar.vue'
import DateBox from './components/date-box.vue'

function install (Vue) {
  Vue.component('su-button', Button)
  Vue.component('su-dropdown-button', DropdownButton)
  Vue.component('su-button-group', ButtonGroup)
  Vue.component('su-list-item', ListItem)
  Vue.component('su-list-header', ListHeader)
  Vue.component('su-list', List)
  Vue.component('su-option', ComboBoxOption)
  Vue.component('su-combo-box', ComboBox)
  Vue.component('su-search-box', SearchBox)
  Vue.component('su-bar', Bar)
  Vue.component('su-column-list', ColumnList)
  Vue.component('su-form-group', FormGroup)
  Vue.component('su-form-field', FormField)
  Vue.component('su-expand-panel', ExpandPanel)
  Vue.component('su-dialog', ModalDialog)
  Vue.component('su-calendar', Calendar)
  Vue.component('su-date-box', DateBox)
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export {
  install
}
