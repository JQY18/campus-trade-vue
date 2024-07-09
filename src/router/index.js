import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/judge',
    name: 'judge',
    component: () => import('../views/JudgementView.vue')
  },
  {
    path: '/managelogin',
    name: 'managelogin',
    component: () => import('../views/manage/ManagerLogin.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/manage/ManageView.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/manage/CalendarView.vue')
  },
  {
    path: '/line',
    name: 'line',
    component: () => import('../views/manage/LineView.vue')
  },
  {
    path: '/column',
    name: 'column',
    component: () => import('../views/manage/ColumnView.vue')
  },
  
  {
    path: '/radar',
    name: 'radar',
    component: () => import('../views/manage/RadarView.vue')
  },
  
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/post/PostPage.vue')
  },
  
  // 首页
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/TryPage.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/personal/PersonalDiv.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/publish/PublishPage.vue')
  },
  {
    path: '/error404',
    name: 'error404',
    component: () => import('../components/error/ErrorPage404.vue')
  },
  {
    path: '/error500',
    name: 'error500',
    component: () => import('../components/error/ErrorPage500.vue')
  },
  //详情页
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/home/PostDetail.vue')
  },

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
  },

]

const router = new VueRouter({
  routes
})


export default router