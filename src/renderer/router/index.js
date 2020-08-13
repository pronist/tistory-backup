import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/extractor',
      name: 'extractor',
      component: require('@/components/pages/Extractor').default
    },
    {
      path: '/',
      name: 'auth',
      component: require('@/components/pages/Auth').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
