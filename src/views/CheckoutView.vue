<script>
import Product from './components/Product.vue'
import Checkout from './components/Checkout.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Product,
    Checkout
  },
  data() {
    return {
      singleRestaurant: null,
      base_url: 'http://127.0.0.1:8000/',
      cartItems: [],
      total: 0
    }
  },
  methods: {
    updateCart(id) {
      this.cartItems.push(id);
      this.total += this.singleRestaurant.dish.find(dish => dish.id === id).price;
    },
    removeItem(id) {
      const index = this.cartItems.indexOf(id);
      if (index > -1) {
        this.cartItems.splice(index, 1);
        this.total -= this.singleRestaurant.dish.find(dish => dish.id === id).price;
      }
    }
  },
  mounted() {
    axios.get(this.base_url + `api/restaurants/user/${this.$route.params.slug}`)
      .then(response => {
        this.singleRestaurant = response.data.result;
      }).catch(err => {
        console.error(err);
      })
  }
}
</script>


<template>
  <div id="app">
    <div v-for="dish in singleRestaurant.dish" class="col col-md-6 py-1  p-3">
      <Product :key="dish.id" :dish="dish" @add-to-cart="updateCart(dish.id)" @remove-from-cart="removeItem(dish.id)" />
    </div>
    <Checkout :cartItems="cartItems" :total="total" />
  </div>
</template>
  