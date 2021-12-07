import Vue from 'vue'
import VueRouter from 'vue-router'
import NewPlace from '../views/NewPlace.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'newPlace',
    component: NewPlace
  }
]

const router = new VueRouter({
  routes
})

export default router
