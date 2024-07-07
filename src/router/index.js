import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/manage/ManageView.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/post/PostPage.vue')
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => import('../components/comments/CommentsPage.vue')
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

// import request from '../utils/axiosInstance'

// 全局前置守卫
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // 如果需要认证，检查用户是否已经登录
//     const isLoggedIn = localStorage.getItem('token') !== null;
//     if(isLoggedIn){
//       request.get('/user/auth')
//       .then(res => {
//         isLoggedIn = res.data.code == 1;
//         console.log(res)
//       })
//     }
//     if (!isLoggedIn) {
//       // 用户未登录，重定向到登录页面
//       next({ name: 'login' });
//     } else {
//       // 用户已登录，继续导航
//       next();
//     }
//   } else {
//     // 不需要认证，直接前往目标页面
//     next();
//   }
// })

export default router