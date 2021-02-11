<template>
  <nav class="pagination" v-if="items.length > 1">
    <ul class="pagination__list">
      <li :class="['pagination__item', 'pagination__item--next', {
        'is-disabled': !current
      }]">
        <a
            href="#"
            @click.prevent="$emit('prev')"
        >
          &lt;
        </a>
      </li>
      <li class="pagination__item"
          v-for="(item, i) in items"
          :key="i"
          :class="['pagination__item', {
            'is-active': i === current
          }]"
      >
        <a
            href="#"
            @click.prevent="$emit('to', i)"
        >
          {{ i + 1 }}
        </a>
      </li>
      <li :class="['pagination__item', 'pagination__item--next', {
        'is-disabled': current === items.length - 1
      }]">
        <a
            href="#"
            @click.prevent="$emit('next')"
        >
          &gt;
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    items: {
      type: Array,
      required: true
    },
    current: {
      type: Number
    }
  },
  emits: ['to', 'prev', 'next']
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
}

.pagination__list {
  display: inline-flex;
  align-items: center;
  list-style: none;
  border: 1px solid #cccccc;
  padding: 0;
  margin: 0;
  border-radius: 10px;
  overflow: hidden;
}

.pagination__item {
  border-right: 1px solid #cccccc;
}

.pagination__item a {
  display: inline-block;
  color: #999;
  padding: 5px 16px;
}

.pagination__item:hover a {
  color: #3eaf7c;
}

.pagination__item.is-active a {
  color: #3eaf7c;
  font-weight: bold;
}

.pagination__item.is-disabled a {
  opacity: .3;
  pointer-events: none;
}

.pagination__item:last-child {
  border-right: 0;
}
</style>
