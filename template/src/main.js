{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import 'babel-polyfill'
{{#onsen}}
// 如果报字体引入错误 需要去node_module/onsenui下修改各个字体的引入方式 ../ => /
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
{{/onsen}}
import 'common/stylus/index.styl'
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import router from './router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#vuex}}
import store from './store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}
{{#onsen}}
import VueOnsen from 'vue-onsenui'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/onsen}}
import FastClick from 'fastclick'

FastClick.attach(document.body)

{{#onsen}}
Vue.use(VueOnsen)
{{/onsen}}

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  {{#vuex}}
  store,
  {{/vuex}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{#onsen}},
  beforeCreate () {
    // 设置默认的样式为iPhone
    this.$ons.platform.select('iPhone')
  }{{/onsen}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
