<template>
  <div id="app">
    {{#onsen}}
     <v-ons-navigator swipeable
                     animation="lift"
                     swipe-target-width="80px"
                     swipe-threshold="0.4"
                     :page-stack="pageStack"
                     :pop-page="goBack">
    </v-ons-navigator>
    {{else}}
    <router-view></router-view>
    {{/onsen}}
  </div>
</template>

<script>
{{#unless router}}
import HelloWorld from './components/HelloWorld'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{/unless}}
export default {
  name: 'app'{{#if_eq lintConfig "airbnb"}},{{/if_eq}},
  components: {
    HelloWorld{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{#onsen}},
  data () {
    return {
      pageStack: []
    }
  },
  methods: {
    goBack () {
      // Go to the parent route component
      this.$router.push({ name: this.$route.matched[this.$route.matched.length - 2].name })
      // this.$router.go(-1); // Could work but might be misleading in some situations
    }
  },
  created () {
    const mapRouteStack = route => (this.pageStack = route.matched.map(m => m.components.default))
    mapRouteStack(this.$route)
    /* On route change, reset the pageStack to the next route */
    this.$router.beforeEach((to, from, next) => mapRouteStack(to) && next())
  }{{/onsen}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
