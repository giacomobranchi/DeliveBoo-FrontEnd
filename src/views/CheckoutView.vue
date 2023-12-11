<script>
import { state } from '../state.js';
import axios from 'axios';
export default {
  name: 'CheckoutView',
  data() {
    return {
      state,
    }
  },
  methods: {
    checkout() {
      axios.post(this.state.base_url + 'api/checkout', this.state.cart)
        .then(response => {
          console.log(response);
          this.state.cart = [];
        })
        .catch(err => {
          console.error(err);
        });
    },
    emptyCart() {
      this.state.cart = [];
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    total() {
      return this.state.cart.reduce((total, dish) => total + dish.price * dish.quantity, 0);
    }
},
mounted() {
  this.$watch('state.cart', () => {
    this.total = this.state.cart.reduce((total, dish) => total + dish.price * dish.quantity, 0);
  });
  this.$nextTick(() => {
    this.total = this.state.cart.reduce((total, dish) => total + dish.price * dish.quantity, 0);
  });
}
}
</script>

<template>
    <main>
      <div class="container">
        <div v-if="state.cart && state.cart.length" class="row">
          <div class="col-12">
            <h1>Checkout</h1>
            <div v-for="dish in state.cart" class="card mb-3">
              <div class="card-body">
                <img :src="this.state.base_url + 'storage/' + dish.img" class="img-fluid" alt="">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">Price: {{ dish.price }}</p>
                <p class="card-text">Quantity: {{ dish.quantity }}</p>
            </div>
        </div>
        <h2>Total: € {{ total }}</h2>
        <div class="d-flex justify-content-end m-3">
              <button class="btn btn-primary mr-2 mx-2" @click="checkout">Proceed to Checkout</button>
              <button class="btn btn-danger mr-2 mx-2" @click="emptyCart">Empty Cart</button>
              <button class="btn btn-secondary" @click="goBack">Go Back</button>
            </div>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-12">
            <h1>Your cart is empty</h1>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <style lang="scss">
  @use '../assets/scss/partials/variables' as *;
  
  main {
    background-color: $d_boo_primary;
  }
  </style>