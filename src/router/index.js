import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

const Courses = () => import('../views/Courses.vue')
const Course = () => import('../views/Course.vue')

const routes = [
  { path: '/courses', component: Courses },
  { path: '/course/:slug', component: Course },
  { path: '/', component: Home },
]

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
  })
}
