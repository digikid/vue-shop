<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Дата и время</th>
      <th>Покупатель</th>
      <th>Содержимое заказа</th>
      <th>Сумма</th>
      <th>Статус</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(order, i) in pages[current]"
        :key="order.id"
        :class="order.status"
    >
      <td>{{ index(i) }}</td>
      <td>{{ date(order.date) }}
        <AppTimer
            v-if="order.status === 'active'"
            :from="order.date"
        />
      </td>
      <td>{{ order.user.name }}<br/><small>{{ order.user.email }}</small></td>
      <td v-html="products(order.items)"></td>
      <td>{{ total(order.items) }}</td>
      <td>
        <div class="form-control">
          <select
              :value="order.status"
              @change="updateStatus($event, order)"
          >
            <option
                v-for="status in statuses"
                :key="status.value"
                :value="status.value"
            >
              {{ status.title }}
            </option>
          </select>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <AppPagination
      :items="pages"
      :current="current"
      @to="to"
      @next="next"
      @prev="prev"
  />
</template>

<script>
import { computed } from 'vue'
import { useOrders } from '@/use/orders'
import { usePagination } from '@/use/pagination'

import { date } from '@/utils/format/date'
import { currency } from '@/utils/format/currency'

import AppPagination from '@/components/ui/AppPagination'
import AppTimer from '@/components/ui/AppTimer'

export default {
  name: 'AdminOrdersList',
  components: { AppTimer, AppPagination },
  props: {
    items: Array
  },
  setup(props) {
    const {
      statuses,
      update
    } = useOrders()

    const orders = computed(() => props.items)
    const products = items => items.reduce((accumulator, current) => accumulator + `${current.title} (×${current.count})<br/>`, '')
    const total = items => currency(items.reduce((accumulator, current) => accumulator + current.price * current.count, 0))

    const updateStatus = async (e, item) => await update({
      ...item,
      status: e.target.value
    })

    return {
      statuses,
      date,
      products,
      total,
      updateStatus,
      ...usePagination(orders)
    }
  }
}
</script>

<style scoped>
.table small {
  display: block;
  margin-top: 7px;
}

.table small i {
  color: #3eaf7c;
  font-style: normal;
  font-weight: bold;
}

.table tr.done {
  background: rgba(0, 255, 0, .1) !important;
}

.table tr.cancel {
  background: rgba(255, 0, 0, .1) !important;
}

.table tr.active {

}

.table tr.pending {
  background: rgba(255, 255, 0, .1) !important;
}

.table tbody td:nth-child(4) {
  font-size: 14px;
  line-height: 1.5;
}
</style>
