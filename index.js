(function() {
  "use strict";
  var render = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.render ? _c("section", { staticClass: "k-sync-language-field" }, [_c("div", { staticClass: "k-field-label" }, [_vm._v(_vm._s(_vm.label))]), _c("k-button", { staticClass: "da-button", attrs: { "icon": "wand" }, on: { "click": _vm.openDialog } }, [_vm._v(" " + _vm._s(_vm.buttonLabel || "Synchronise") + " ")]), _c("k-dialog", { ref: "dialog", attrs: { "size": "small" } }, [!_vm.success ? _c("div", [_c("k-select-field", { staticClass: "mb", attrs: { "options": _vm.otherLanguages, "required": true, "label": "Select source language", "name": "sync_from", "help": "From which language would you like to synchronise content from?" }, model: { value: _vm.syncFromLanguage, callback: function($$v) {
      _vm.syncFromLanguage = $$v;
    }, expression: "syncFromLanguage" } }), _c("k-checkboxes-field", { attrs: { "label": "Fields to synchronise", "options": _vm.syncableFields }, model: { value: _vm.fieldsToSync, callback: function($$v) {
      _vm.fieldsToSync = $$v;
    }, expression: "fieldsToSync" } }), _c("k-button", { staticClass: "uncheck-button", attrs: { "icon": "cancel-small" }, on: { "click": function($event) {
      _vm.fieldsToSync = [];
    } } }, [_vm._v(" Uncheck all ")])], 1) : _c("k-text", [_vm._v(" The content has been synced from "), _c("span", { staticClass: "upper" }, [_vm._v(_vm._s(_vm.syncFromLanguage))]), _vm._v(". ")]), _c("template", { slot: "footer" }, [_c("k-button-group", [_c("k-button", { attrs: { "icon": "cancel", "theme": _vm.closeButtonTheme }, on: { "click": _vm.closeDialog } }, [_vm._v(_vm._s(_vm.success ? "Sluiten" : "Annuleren"))]), _vm.allowSync ? _c("k-button", { attrs: { "icon": "play" }, on: { "click": _vm.getContentFromLanguage } }, [_vm._v("Let's GO!")]) : _vm._e()], 1)], 1)], 2)], 1) : _vm._e();
  };
  var staticRenderFns = [];
  render._withStripped = true;
  var Sync_vue_vue_type_style_index_0_lang = "";
  var Sync_vue_vue_type_style_index_1_scoped_true_lang = "";
  function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render2) {
      options.render = render2;
      options.staticRenderFns = staticRenderFns2;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const __vue2_script = {
    props: {
      label: String,
      buttonLabel: String,
      pageID: String,
      pageFields: Array,
      languages: Array,
      render: Boolean
    },
    data() {
      return {
        success: false,
        syncFromLanguage: null,
        fieldsToSync: []
      };
    },
    computed: {
      closeButtonTheme() {
        return this.success ? "positive" : "negative";
      },
      allowSync() {
        return !this.success && this.syncFromLanguage && this.fieldsToSync.length;
      },
      otherLanguages() {
        return this.languages ? Object.entries(this.languages).filter((lang) => lang[0] !== this.$language.code).map((lang) => {
          return { value: lang[0], text: lang[1] };
        }) : [];
      },
      syncableFields() {
        return this.pageFields.map((field) => {
          return { value: field.name, text: field.label };
        });
      }
    },
    mounted() {
      this.pageFields.forEach((field) => this.fieldsToSync.push(field.name));
    },
    methods: {
      openDialog() {
        this.success = false;
        this.$refs.dialog.open();
      },
      closeDialog() {
        this.$refs.dialog.close();
        this.success = false;
      },
      syncFields(fields) {
        console.log(fields);
        try {
          fields.forEach((field) => {
            if (this.fieldsToSync.includes(field.name)) {
              this.$store.dispatch("content/update", [field.name, field.value]);
            }
          });
        } catch (error) {
          console.error(error);
        }
        this.success = true;
        console.log(this.$store.state.content);
      },
      getContentFromLanguage() {
        this.$api.post(`sync-lang/${encodeURIComponent(this.pageID)}`, { fromLang: this.syncFromLanguage }).then((response) => {
          if (response.success) {
            this.syncFields(response.content);
          } else {
            console.error("Response:", response);
          }
        }).catch((error) => console.error(error));
      }
    }
  };
  const __cssModules = {};
  var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, "4260014b", null, null);
  function __vue2_injectStyles(context) {
    for (let o in __cssModules) {
      this[o] = __cssModules[o];
    }
  }
  __component__.options.__file = "src/components/Sync.vue";
  var Sync = /* @__PURE__ */ function() {
    return __component__.exports;
  }();
  window.panel.plugin("sietseveenman/kirby3-language-sync", {
    fields: {
      "sync": Sync
    }
  });
})();
