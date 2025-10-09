import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import DefaultLayout from '@/components/layout/PublicLayout.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/login/Login.vue'
import Join from '@/views/login/Join.vue'

import DashboardLayout from '@/components/dashboard/DashboardLayout.vue'
import DashboardHome from '@/views/dashboard/Home.vue'
import Write from '@/views/board/Write.vue'

const routes = [
  { 
    path: '/', 
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/write',
        component: Write,
        meta: { requiresAuth: true }
      }
    ]
  },
  { 
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: DashboardHome,
        name: 'DashboardHome'
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/join',
    component: Join,
    meta: { requiresGuest: true }
  }
]

const router = createRouter({ 
  history: createWebHistory('/'), 
  routes 
});

// 네비게이션 가드 - userStore 사용
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  // 인증이 필요한 페이지
  if (to.meta.requiresAuth) {
    if (!userStore.isLoggedIn) {
      // 로그인되지 않았으면 로그인 페이지로
      next('/login');
    } else {
      next();
    }
  } 
  // 게스트만 접근 가능한 페이지 (로그인, 회원가입)
  else if (to.meta.requiresGuest) {
    if (userStore.isLoggedIn) {
      // 이미 로그인되어 있으면 대시보드로
      next('/dashboard');
    } else {
      next();
    }
  } 
  else {
    next();
  }
});

export default router;