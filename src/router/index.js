import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Shop from '@/views/Shop'
import Product from '@/views/Product'
import Cart from '@/views/Cart'
import Auth from '@/views/Auth'
import Admin from '@/views/Admin'
import AdminProducts from '@/views/admin/AdminProducts'
import AdminCategories from '@/views/admin/AdminCategories'
import AdminProduct from '@/views/admin/AdminProduct'
import AdminCategory from '@/views/admin/AdminCategory'
import AdminHome from '@/views/admin/AdminHome'

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
}, {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
        layout: 'admin',
        auth: true
    },
    children: [{
        path: '',
        component: AdminHome
    }, {
        path: 'products',
        component: AdminProducts
    }, {
        path: 'products/:id',
        component: AdminProduct
    }, {
        path: 'categories',
        component: AdminCategories
    }, {
        path: 'categories/:id',
        component: AdminCategory
    }]
}, {
    path: '/:notFound(.*)',
    name: '404',
    redirect: '/'
}]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    const requiredAuth = to.meta.auth

    if (requiredAuth && !store.getters['auth/isAuthenticated']) {
        next('/auth?message=auth')
    }

    next()
})

export default router
