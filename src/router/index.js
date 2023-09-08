import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detect from '../views/Detect.vue'
import Manage from '../views/Manage.vue'
import Visual from '../views/Visual.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

    children: [
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },

    ]
  },

  {
    path: '/detect',
    name: 'Detect',
    component: Detect
  },

  {
    path: '/manage',
    name: 'Manage',
    component: Manage
  },

  {
    path: '/visual',
    name: 'Visual',
    component: Visual
  }
]


const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
