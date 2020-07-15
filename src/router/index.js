import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Registration',
    name: 'registration',
    component: () => import(/* webpackChunkName: "Registration" */ '../views/Registration.vue')
  },
  {
    path: '/AfterReservation',
    name: 'AfterReservation',
    component: () => import(/* webpackChunkName: "Registration" */ '../views/AfterReservation.vue')
  },
  {
    path: '/AllReservations',
    name: 'AllReservations',
    component: () => import(/* webpackChunkName: "Registration" */ '../views/AllReservations.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
