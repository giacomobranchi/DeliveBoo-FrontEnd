<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
  name: 'SingleRestaurant',

  data() {
    return {
      state,
      singleRestaurant: null,
      base_url: 'http://127.0.0.1:8000/',
      quantities: {} // Add a quantities object
    };
  },
  methods: {
    addToCart(dish) {
      // Create a new object containing the dish and its quantity
      const dishWithQuantity = {
        name: dish.name,
        price: Number(dish.price),
        description: dish.description,
        img: dish.img, // Include the image URL
        quantity: this.quantities[dish.id] || 1 // Use the quantity from the quantities object
      };

      // Push the dish with quantity to the local state cart
      this.state.cart.push(dishWithQuantity);
    },
    incrementQuantity(dish) {
      if (!this.quantities[dish.id]) {
        this.quantities[dish.id] = 1;
      } else {
        this.quantities[dish.id]++;
      }
    },
    decrementQuantity(dish) {
      if (this.quantities[dish.id] && this.quantities[dish.id] > 1) {
        this.quantities[dish.id]--;
      }
    },
  },

  mounted() {
    axios.get(this.base_url + `api/restaurants/user/${this.$route.params.slug}`)
      .then(response => {
        console.log('topperia');
        console.log(`http://localhost:8000/api/restaurants/user/${this.$route.params.slug}`);
        this.singleRestaurant = response.data.result;
      }).catch(err => {
        console.error(err);
      })
  }
}
</script>


<template>
  <div class="container" v-if="singleRestaurant">
    <div class="row flex-column">

      <!-- column with name and address -->
      <div class="col-md-3">
        <h1>{{ singleRestaurant.name }}</h1>
        <p>{{ singleRestaurant.address }}</p>
      </div>

      <div class="col-12 col-md-9">
        <div class="row row-cols-1 row-cols-md-2">
          <div v-for="dish in singleRestaurant.dish" class="col col-md-6 py-3">
            <div class="card">

              <!-- <div v-if="base_url + 'storage/' + dish.img">
                <img :src="base_url + 'storage/' + dish.img" class="img-fluid" alt="">
              </div>
              <div v-else>
                <img :src="dish.img" alt="">
              </div> -->
              <img v-if="dish.img.indexOf('http') !== -1" :src="dish.img" alt="External Image">
              <img v-else :src="base_url + 'storage/' + dish.img" alt="Local Image">

              <div class="card-body p-3">
                <h5 class="card-title mb-0"><strong>{{ dish.name }}</strong></h5>

                <div class="row">
                  <div class="col text-center">
                    <div class="badge bg-danger">
                      {{ dish.price }}
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <button class="btn btn-primary" @click="decrementQuantity(dish)">-</button>
                    <span>{{ quantities[dish.id] || 1 }}</span>
                    <button class="btn btn-primary" @click="incrementQuantity(dish)">+</button>
                  </div>

                  <button class="btn btn-primary mr-2" @click="addToCart(dish)">Add to Cart</button>
                  <router-link :to="{ name: 'CheckoutView' }">
                    <button class="btn btn-secondary">Go to Checkout</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  </div>
  <!-- /.container -->
</template>
  

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;
</style>
