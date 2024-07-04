import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'try',
    component: () => import('../views/TryPage.vue')
  },

  // 首页

  // 个人主页
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/personal/PersonalPage.vue')
  },
  // 登录页面

  // 关于
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router