<script>
import { store } from './store.js'

export default {
  data() {
    return {
      fuzzyStr: ''
    }
  },
  watch: {
    fuzzyStr(cur, prev) {
      store.searchText(cur)
    }
  }
}
</script>

<template>
  <input v-model="fuzzyStr" placeholder="Item/Customer/Destination" />
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
