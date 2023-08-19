import { createRouter, createWebHistory } from 'vue-router'
import ListaCepView from '../views/ListaCepView.vue'
import SearchCepView from '../views/SearchCepView.vue'

const routes = [
  {
    path: '/lista',
    name: 'lista',
    component: ListaCepView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    
  // },
  {
    path: '/search',
    name: 'search',
    component: SearchCepView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
