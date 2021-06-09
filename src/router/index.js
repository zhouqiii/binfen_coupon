import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("@/views/Home")
  },
  {
    path: '/myTicket',
    name: 'myTicket',
    component: () => import('../views/myTicket')
  },
  {
    path: '/myOrderList',
    name: 'myOrderList',
    component: () => import('../views/myOrderList')
  },
  {
    path: '/HistoricalRecords',
    name: 'HistoricalRecords',
    component: () => import('../views/HistoricalRecords')
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    component: () => import('../views/myOrder')
    // path: '/Page1',
    // name: 'Page1',
    // component: () => import(/* webpackChunkName: "page" */ '../views/Page1')
  },
  {
    path: '/MyActivity',
    name: 'MyActivity',
    component: () => import(/* webpackChunkName: "page" */ '../views/MyActivity')
  }
]

const router = new VueRouter({
  routes
})

export default router
