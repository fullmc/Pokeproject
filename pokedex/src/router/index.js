import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from '../views/homeView.vue'
import detailsView from '../views/detailsView.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeView',
    component: homeView
  },
  {
    path: '/pokemon/:pokemonId',
    name: 'pokemon',
    component: detailsView
  },

]

const router = new VueRouter({
  routes
})

export default router
