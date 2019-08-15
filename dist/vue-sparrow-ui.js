(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.VueSparrow = {}));
}(this, function (exports) { 'use strict';

  //
  var script = {
    name: 'SuButton',
    props: {
      buttonType: {
        type: String,
        default: 'normal',

        validator(value) {
          return ['normal', 'primary', 'submit', 'danger'].indexOf(value) !== -1;
        }

      },
      buttonStyle: {
        type: String,
        default: 'normal',

        validator(value) {
          return ['normal', 'outline', 'text', 'link'].indexOf(value) !== -1;
        }

      },
      buttonShape: {
        type: String,
        default: 'normal',

        validator(value) {
          return ['normal', 'round'].indexOf(value) !== -1;
        }

      },
      caption: String,
      icon: String,
      iconOnly: Boolean
    },
    computed: {
      isIconOnly() {
        console.log(this.$slots);
        return this.iconOnly || !this.$slots.default && !this.caption && this.icon;
      }

    },
    methods: {
      onClick() {
        this.$emit('click');
      }

    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__ = script;
  /* template */

  var __vue_render__ = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("button", {
      staticClass: "su-button",
      attrs: {
        "icon-only": _vm.isIconOnly,
        "button-type": _vm.buttonType,
        "button-style": _vm.buttonStyle,
        "button-shape": _vm.buttonShape
      },
      on: {
        click: _vm.onClick
      }
    }, [_vm.icon ? _c("i", {
      staticClass: "icon"
    }) : _vm._e(), _vm._v(" "), _vm._t("default", [!_vm.iconOnly && _vm.caption ? _c("span", [_vm._v(_vm._s(_vm.caption))]) : _vm._e()])], 2);
  };

  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  /* style */

  const __vue_inject_styles__ = undefined;
  /* scoped */

  const __vue_scope_id__ = undefined;
  /* module identifier */

  const __vue_module_identifier__ = undefined;
  /* functional template */

  const __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  var Button = normalizeComponent_1({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

  // import ButtonGroup from './components/button-group.vue'
  // import ListItem from './components/list-item.vue'
  // import ListHeader from './components/list-header.vue'
  // import List from './components/list.vue'
  // import ComboBox from './components/combo-box.vue'
  // import ComboBoxOption from './components/combo-box-option.vue'
  // import SearchBox from './components/search-box.vue'
  // import Bar from './components/bar.vue'
  // import ColumnList from './components/column-list.vue'
  // import FormGroup from './components/form-group.vue'
  // import FormField from './components/form-field.vue'
  // import ExpandPanel from './components/expand-panel.vue'
  // import ModalDialog from './components/dialog.vue'
  // import Calendar from './components/calendar.vue'
  // import DateBox from './components/date-box.vue'

  function install(Vue) {
    Vue.component('su-button', Button); // Vue.component('su-dropdown-button', DropdownButton)
    // Vue.component('su-button-group', ButtonGroup)
    // Vue.component('su-list-item', ListItem)
    // Vue.component('su-list-header', ListHeader)
    // Vue.component('su-list', List)
    // Vue.component('su-option', ComboBoxOption)
    // Vue.component('su-combo-box', ComboBox)
    // Vue.component('su-search-box', SearchBox)
    // Vue.component('su-bar', Bar)
    // Vue.component('su-column-list', ColumnList)
    // Vue.component('su-form-group', FormGroup)
    // Vue.component('su-form-field', FormField)
    // Vue.component('su-expand-panel', ExpandPanel)
    // Vue.component('su-dialog', ModalDialog)
    // Vue.component('su-calendar', Calendar)
    // Vue.component('su-date-box', DateBox)
  }

  if (typeof window !== 'undefined' && window.Vue) install(window.Vue);

  exports.Button = Button;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vue-sparrow-ui.js.map
