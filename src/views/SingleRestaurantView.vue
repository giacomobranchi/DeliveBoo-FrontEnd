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
      // Check if the dish is already in the cart
      const existingDishIndex = this.state.cart.findIndex(item => item.name === dish.name);

      if (existingDishIndex !== -1) {
        // If the dish is already in the cart, update its quantity
        this.state.cart[existingDishIndex].quantity += this.quantities[dish.id] || 1;
      } else {
        // If the dish is not in the cart, add a new instance with quantity 1
        const dishWithQuantity = {
          name: dish.name,
          price: Number(dish.price),
          description: dish.description,
          img: dish.img,
          quantity: this.quantities[dish.id] || 1
        };

        // Push the dish with quantity to the cart
        this.state.cart.push(dishWithQuantity);
      }
    },

    // Function to increment the quantity of a dish in the cart
    incrementQuantityCart(dish) {
      const existingItemIndex = this.state.cart.findIndex(item => item.name === dish.name);

      if (existingItemIndex !== -1) {
        // If the dish is in the cart, increment its quantity
        this.state.cart[existingItemIndex].quantity += 1;
      }
      // You can add additional logic if the item is not found (optional)
    },

    // Function to decrement the quantity of a dish in the cart
    decrementQuantityCart(dish) {
      const existingItemIndex = this.state.cart.findIndex(item => item.name === dish.name);

      if (existingItemIndex !== -1) {
        // If the dish is in the cart and its quantity is greater than 1, decrement the quantity
        if (this.state.cart[existingItemIndex].quantity > 1) {
          this.state.cart[existingItemIndex].quantity -= 1;
        } else {
          // Optionally, remove the item from the cart if the quantity becomes 0
          this.state.cart.splice(existingItemIndex, 1);
        }
      }
      // You can add additional logic if the item is not found (optional)
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
  <div class="container py-4" v-if="singleRestaurant">




    <h1>{{ singleRestaurant.name }}</h1>
    <p class="text-light pt-2">
      <i class="fa-solid fa-location-dot fa-xl me-2"></i>
      {{ singleRestaurant.address }}
    </p>

    <!-- row that contains dishes and checkout -->
    <div class="row py-3">

      <!-- column with dishes -->
      <div class="col-9">

        <div class="row row-cols-1 row-cols-md-2">

          <!-- dinamic generation of dish column with cards -->
          <div v-for="dish in singleRestaurant.dish" class="col col-md-6 pb-3">

            <div class="my_card text-break d-flex flex-column">

              <div class="row">

                <!-- top column with image and description, name and ingredients -->
                <div class="col-12 d-flex mb-4">

                  <!-- image col -->
                  <div>
                    <img v-if="dish.img.indexOf('http') !== -1" :src="dish.img" alt="External Image"
                      class="img-fluid rounded-2">
                    <img v-else :src="base_url + 'storage/' + dish.img" alt="Local Image" class="img-fluid rounded-2">
                  </div>

                  <!-- infos col -->
                  <div class="col-8 px-2 ms-1">
                    <h5 class="fw-bolder text-truncate">
                      {{ dish.name }}
                    </h5>
                    <p>
                      {{ dish.ingredients }}
                    </p>
                  </div>

                </div>

                <!-- bottom column with price and action -->
                <div class="col-12">

                  <div class="row justify-content-between align-items-center">

                    <!-- price -->
                    <div class="fs-5 fw-bolder col-3">
                      €{{ dish.price }}
                    </div>

                    <!-- actions -->
                    <div class="col-7">
                      <div id="actions" class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-primary" @click="decrementQuantity(dish)">
                          -
                        </button>
                        <div class="counter">
                          <span class="fs-5">
                            {{ quantities[dish.id] || 1 }}
                          </span>
                        </div>

                        <button class="btn btn-primary" @click="incrementQuantity(dish)">
                          +
                        </button>
                        <button class="btn btn-primary mr-2" @click="addToCart(dish)">
                          Add to Cart
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>


      <!-- col with checkout -->
      <div class="col-3">

        <div class="card checkout text-break text-center">

          <div class="card-header">
            <h4>
              Your order
            </h4>
          </div>
          <div class="card-body p-2">

            <p v-if="state.cart.length === 0" class="fw-bold">
              Non hai aggiunto prodotti al momento, quando lo farai appariranno qua!
            </p>


            <ul v-else class="list-unstyled">
              <li v-for="dish in state.cart" class="pb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <button class="btn my_check_btn" @click="decrementQuantityCart(dish)">
                    -
                  </button>

                  <span class="px-3">
                    {{ dish.name }} - {{ dish.quantity }}x
                  </span>

                  <button class="btn my_check_btn" @click="incrementQuantityCart(dish)">
                    +
                  </button>
                </div>
              </li>
            </ul>

          </div>
          <div class="card-footer d-flex justify-content-center">

            <router-link :to="{ name: 'CheckoutView', params: { slug: singleRestaurant.slug } }">
              <button class="btn">
                Go to Checkout
              </button>
            </router-link>

          </div>
        </div>

      </div>
    </div>


  </div>
  <!-- /.container -->
</template>
  

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

h1 {
  color: $d_boo_orange;
}

img {
  max-height: 115px;
  max-width: 150px;
  min-height: 115px;
  min-width: 150px;
}

.checkout {
  background-color: $d_boo_orange;

  .my_check_btn {
    padding: .2rem .6rem;
  }

  button {
    background-color: black;
    color: $d_boo_orange;
    border: 1px solid transparent;
    font-weight: 600;

    &:hover {
      background-color: $d_boo_bg;
      border: 1px solid $d_boo_bg;
    }
  }
}

.my_card {
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  max-height: 210px;
  max-width: 470px;
  min-height: 210px;
  min-width: 470px;
}

#actions {
  button {
    background-color: $d_boo_orange;
    border: 1px solid transparent;
    color: black;
    font-weight: 600;

    &:hover {
      border: 1px solid black;
    }
  }
}
</style>
