<script>
import { store } from './store.js'
import Search from './Search.vue'
import SearchFuzzy from './SearchFuzzy.vue'

export default {
  components: {
    Search,
    SearchFuzzy
  },
  data() {
    return {
      timeFmt: 'YYYY-MM-DD h:mm:ss',
      store
    }
  },
  computed: {
    orders() {
      if (Number.isNaN(this.store.searchPrice)) {
        return this.store.orders.filter(o => {
          if (this.store.searchFuzzy === '') return true
          return o.text.indexOf(this.store.searchFuzzy) > -1
        }).reverse().slice(0, 100)
      }

      return this.store.searchPrice in this.store.ordersByPrice ?
          this.store.ordersByPrice[this.store.searchPrice].reverse() : []
    },
    numOrders() {
      if (Number.isNaN(this.store.searchPrice)) {
        return this.store.orders.filter(o => {
          if (this.store.searchFuzzy === '') return true
          return o.text.indexOf(this.store.searchFuzzy) > -1
        }).length
      }

      return this.store.searchPrice in this.store.ordersByPrice ?
          this.store.ordersByPrice[this.store.searchPrice].length : 0
    }
  }
}
</script>

<template>
  <div id="table-utils">
    <Search />
    <SearchFuzzy />
    <span id="num-results"># Results: <span>{{numOrders}}</span></span>
  </div>
  <table>
    <tr>
      <th>Order ID</th>
      <th>Status</th>
      <th>Updated</th>
      <th>Created</th>
      <th>Item</th>
      <th>Price</th>
      <th>Customer</th>
      <th>Destination</th>
    </tr>
    <tr v-for="order in orders" :key="order.id">
      <td>{{order.id}}</td>
      <td>{{order.status}}</td>
      <td>{{order.updatedAt.format(timeFmt)}}</td>
      <td>{{order.createdAt.format(timeFmt)}}</td>
      <td>{{order.item}}</td>
      <td>{{order.price}}</td>
      <td>{{order.customer}}</td>
      <td>{{order.destination}}</td>
    </tr>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

td, th {
  border: none;
  padding: 0.5rem;
}

table tr:nth-child(even) {
  background: #44475a;
}

#num-results {
  float: right;
  padding: 0.5rem;
}

#num-results span {
  color: #ff5555;
}
</style>
