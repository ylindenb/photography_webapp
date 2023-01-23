import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ImageUpload from '../views/ImageUpload.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Portfolios from '../views/Portfolios.vue'
import Gallery from '../components/Gallery.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import Orders from '../views/Orders.vue'
import CustomerOrders from '../views/CustomerOrders.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/upload',
      name: 'upload',
      component: ImageUpload
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/portfolios',
      name: 'portfolios',
      component: Portfolios
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery,
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCart,
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
    },
    {
      path: '/customerOrders',
      name: 'customerOrders',
      component: CustomerOrders,
    },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/', '/portfolios', '/gallery'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
