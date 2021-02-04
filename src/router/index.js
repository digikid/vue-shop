import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Shop from '@/views/Shop'
import Product from '@/views/Product'
import Cart from '@/views/Cart'
import Auth from '@/views/Auth'

const routes = [{
    path: '/',
    name: 'Shop',
    component: Shop,
    meta: {
        layout: 'main'
    }
}, {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    meta: {
        layout: 'main'
    }
}, {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
        layout: 'main'
    }
}, {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
        layout: 'auth'
    }
}]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    const requiredAuth = to.meta.auth

    if (requiredAuth && store.getters['auth/isAuthenticated']) {
        next()
    } else if (requiredAuth && !store.getters['auth/isAuthenticated']) {
        next('/auth?message=auth')
    } else {
        next()
    }
})

export default router
