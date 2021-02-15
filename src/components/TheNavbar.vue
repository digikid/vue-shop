<template>
  <nav class="navbar">
    <h3>
      <RouterLink
          to="/admin"
          v-if="isAdminLayout && isAdmin"
      >
        Админка
      </RouterLink>
      <RouterLink
          to="/"
          v-else
      >
        Vue Shop
      </RouterLink>
    </h3>
    <ul
        class="navbar-menu"
        v-if="isAdminLayout && isAdmin"
    >
      <li>
        <RouterLink to="/admin/orders">Заказы</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/products">Товары</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/categories">Категории</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/users">Пользователи</RouterLink>
      </li>
      <li>
        <RouterLink to="/">В магазин</RouterLink>
      </li>
      <li>
        <a @click="logout">Выйти</a>
      </li>
    </ul>
    <ul
        class="navbar-menu"
        v-else
    >
      <li>
        <RouterLink to="/">Магазин</RouterLink>
      </li>
      <li>
        <RouterLink to="/cart">Корзина <i v-if="cartCount">{{ cartCount }}</i></RouterLink>
      </li>
      <li v-if="isAuthenticated && isAdmin">
        <RouterLink to="/admin">В админку</RouterLink>
      </li>
      <li v-if="!isAuthenticated">
        <RouterLink to="/auth">Войти</RouterLink>
      </li>
      <li v-if="isAuthenticated">
        <a @click="logout">Выйти</a>
      </li>
    </ul>
    <div
        v-if="user"
        :class="['navbar-user', user.role]"
    >
      {{ user.name }}
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '@/use/cart'
import { useAuth } from '@/use/auth'

export default {
  name: 'TheNavbar',
  setup() {
    const route = useRoute()
    const isAdminLayout = ref(route.meta.layout === 'admin')

    const {
      isAuthenticated,
      isAdmin,
      user,
      logout
    } = useAuth()

    const { count: cartCount } = useCart()

    return {
      user,
      isAdminLayout,
      isAdmin,
      isAuthenticated,
      cartCount,
      logout
    }
  }
}
</script>

<style scoped>
.navbar {
  align-items: center;
}

.navbar-menu {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
}

.navbar-menu li {
  position: relative;
  padding-right: 15px;
  margin-right: 1rem;
}

.navbar-menu li i {
  position: absolute;
  top: -5px;
  right: 0;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  color: #fff;
  background: #c25205;
  border-radius: 50%;
}

.navbar-user {
  position: relative;
  font-size: 14px;
  color: #777;
  padding-left: 35px;
}

.navbar-user:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-image: url('/assets/user.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.navbar-user.admin:before {
  background-image: url('/assets/admin.svg');
}
</style>
