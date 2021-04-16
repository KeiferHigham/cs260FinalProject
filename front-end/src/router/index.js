import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'
import Find from '../views/Find.vue'
import Add from '../views/Add.vue'
import Login from '../views/Login.vue'
import Review from '../views/Review.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Favorites',
    name: 'Favorites',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Favorites
  },
  {
    path: '/Find',
    name: 'Find',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Find
  },
  {
    path: '/Add',
    name: 'Add',
    component: Add
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/movieReview/:id',
    name: 'Review',
    component: Review,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
