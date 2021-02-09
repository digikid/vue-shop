<template>
  <nav class="navbar">
    <h3>
      <RouterLink to="/admin">Админка</RouterLink>
    </h3>
    <ul class="navbar-menu">
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
  </nav>
</template>

<script>
import { useAuth } from '@/use/auth'

export default {
  name: 'AdminNavbar',
  setup() {
    const {
      logout
    } = useAuth()

    return {
      logout
    }
  }
}
</script>

<style scoped>

</style>
