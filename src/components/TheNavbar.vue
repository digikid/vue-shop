<template>
  <nav class="navbar">
    <h3>Vue Shop</h3>
    <ul class="navbar-menu">
      <li>
        <RouterLink to="/">Магазин</RouterLink>
      </li>
      <li>
        <RouterLink to="/cart">Корзина</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar'
}
</script>

<style scoped>

</style>
