import { reactive } from 'vue'
import moment from 'moment'

class Order {
  constructor(event) {
    this.id = event.id
    this.price = event.price
    this.item = event.item
    this.customer = event.customer
    this.destination = event.destination
    this.createdAt = moment()

    this.updateStatus(event.event_name)
    this.makeText()
  }

  updateStatus(status) {
    this.updatedAt = moment()
    this.status = status
  }

  makeText() {
    this.text = `${this.item} ${this.customer} ${this.destination}`
  }
}

export const store = reactive({
	searchPrice: NaN,
  searchFuzzy: '',
  orderMappings: {},
  ordersByPrice: {},
  orders: [],
  search(price) {
		this.searchPrice = parseInt(price)
  },
  searchText(text) {
    this.searchFuzzy=text
  },
  receive(event) {
    if (event.id in this.orderMappings) {
      this.orders[this.orderMappings[event.id]].updateStatus(event.event_name)
      this.orders = [...this.orders]
    } else {
      const order = new Order(event)
      this.orderMappings = {[order.id]: this.orders.length, ...this.orderMappings}
      this.orders = [...this.orders, order]
      if (order.price in this.ordersByPrice) {
        this.ordersByPrice[order.price].push(order)
        this.ordersByPrice = {...this.ordersByPrice}
      } else {
        this.ordersByPrice = {[order.price]: [order], ...this.ordersByPrice}
      }
    }
  }
})
