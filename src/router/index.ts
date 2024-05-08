import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/home/products',
          name: 'products',
          component: () => import('../views/ProductListView.vue')
        },
        {
          path: '/home/services',
          name: 'services',
          component: () => import('../views/ServiceListView.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashBoardView.vue'),
      children: [
        {
          path: '/dashboard/products/:id',
          name: 'dashboardProducts',
          component: () => import('../views/ProductListView.vue')
        },
        {
          path: '/dashboard/services/:id',
          name: 'dashboardServices',
          component: () => import('../views/ServiceListView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/users',
      component: () => import('../views/AdminView.vue'),
      children: [
        {
          path: '/admin/users',
          name: 'adminUsers',
          component: () => import('../views/UsersListView.vue')
        },
        {
          path: '/admin/products',
          name: 'adminProducts',
          component: () => import('../views/ProductListView.vue')
        },
        {
          path: '/admin/services',
          name: 'adminServices',
          component: () => import('../views/ServiceListView.vue')
        }
      ]
    },
    {
      path: '/detailsUser/:id',
      name: 'detailsUser',
      component: () => import('../views/DetailUserView.vue')
    },
    {
      path: '/detailsProduct/:id',
      name: 'detailsProduct',
      component: () => import('../views/DetailProductView.vue')
    },
    {
      path: '/detailsService/:id',
      name: 'detailsService',
      component: () => import('../views/DetailServiceView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'dashboard' && !localStorage.getItem('token')) {
    next({ name: 'login' })
  } else {
    next()
  }
});

router.beforeEach((to, from, next) => {
  if (to.name === 'admin' && (!localStorage.getItem('token') || localStorage.getItem('role') !== 'Admin')) {
    next({ name: 'login' })
  }
  else {
    next()
  }
});





export default router
