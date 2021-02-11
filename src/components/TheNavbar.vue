<template>
  <nav class="navbar">
    <h3>
      <RouterLink
          to="/admin"
          v-if="isAdmin"
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
        v-if="isAdmin"
    >
      <li>
        <RouterLink to="/admin/products">Товары</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/categories">Категории</RouterLink>
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
      <li v-if="isAuthenticated">
        <RouterLink to="/admin">В админку</RouterLink>
      </li>
      <li v-if="isAuthenticated">
        <a @click="logout">Выйти</a>
      </li>
    </ul>
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
    const { count: cartCount } = useCart()

    const {
      isAuthenticated,
      logout
    } = useAuth()

    const route = useRoute()
    const isAdmin = ref(route.meta.layout === 'admin')

    return {
      isAdmin,
      cartCount,
      isAuthenticated,
      logout
    }
  }
}
</script>

<style scoped>
.navbar li {
  position: relative;
  padding-right: 15px;
  margin-right: 1rem;
}

.navbar li i {
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
</style>
