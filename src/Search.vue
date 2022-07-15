<script>
import { store } from './store.js'

export default {
  data() {
    return {
      priceStr: ''
    }
  },
  watch: {
    priceStr(cur, prev) {
      store.search(cur)
    }
  }
}
</script>

<template>
  <input v-model="priceStr" placeholder="Price i.e. 100" />
</template>

<style scoped>
input {
  border: none;
  outline: none;
  background: none;
  border-bottom: 2px solid #50fa7b;
  color: #8be9fd;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
</style>
