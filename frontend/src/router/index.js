import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)




// meta: { login: true } หมายถึงต้อง login ก่อนถึงจะเข้า url นี้ได้
const routes = [
  {
    
    path: '/login',
    name: 'login',
    component: () => import('../views/web_view/LoginPage.vue')
  },
  {
    path: '/Appointment/:userId',
    name: 'Appointment',
    meta: { login: true },
    component: () => import('../views/web_view/Appointment.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/web_view/HomePage.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: { login: true },
    component: () => import('../views/web_view/DashboardPage.vue')
  },
  {
    path: '/account/:userId',
    name: 'account',
    meta: { login: true },
    component: () => import('../views/web_view/Account.vue')
  },
]

const router = new VueRouter({
  routes
})






// ใช้ router.beforeEach ในการตรวจสอบข้อมูล ใน meta และทำการ redirect ผู้ใช้ที่ไปยังที่ที่สมควรไป
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/login' })
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in")
    next({ path: '/'})
  }

  next()
})



export default router
