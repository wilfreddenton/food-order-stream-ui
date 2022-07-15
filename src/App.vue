<script>
import Orders from './Orders.vue'
import { store } from './store.js'
import { io } from 'socket.io-client'

export default {
  components: {
    Orders
  },
  mounted() {
    const socket = io("http://localhost:4000");
    socket.on('order_event', (events) => {
      events.forEach(e => store.receive(e))
    });
  }
}
</script>

<template>
  <h1>Order Status</h1>
  <Orders />
</template>

<style scoped>
h1 {
  color: #ff79c6;
}
</style>
