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
        layout: 'main'
    }
}, {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */'@/views/Admin.vue'),
    meta: {
        layout: 'admin',
        auth: true
    },
    children: [{
        path: '',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Orders.vue'),
        alias: 'orders'
    }, {
        path: 'products',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Products.vue')
    }, {
        path: 'products/:id',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Product.vue')
    }, {
        path: 'categories',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Categories.vue')
    }, {
        path: 'categories/:id',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Category.vue')
    }, {
        path: 'users',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/Users.vue')
    }, {
        path: 'users/:id',
        component: () => import(/* webpackChunkName: "admin" */'@/views/admin/User.vue')
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
        return next('/auth?message=auth')
    }

    return next()
})

export default router
