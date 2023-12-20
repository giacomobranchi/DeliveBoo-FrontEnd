<script>
import { state } from '../state.js';
import axios from 'axios';
import { useCheckoutStore } from '../state.js';

export default {
  name: 'SingleRestaurant',

  data() {
    return {
      state,
      singleRestaurant: null,
      base_url: 'http://127.0.0.1:8000/',
      quantities: {},

    };
  },
  computed: {
    cart() {
      return useCheckoutStore().cart;
    },

    /* isEmptyCart() {
      return useCheckoutStore().cart.length === 0 || useCheckoutStore().cart.every(dish => dish.restaurant === this.singleRestaurant.user_id);
    }
    */
    filteredCart() {
      // Replace 'restaurantId' with the actual property that identifies the restaurant
      return this.cart.filter(item => item.restaurant.name === this.singleRestaurant.name);
    },
  },
  methods: {

    addToCart(dish) {
      // Check if the dish is already in the cart

      if (useCheckoutStore().cart === '') {
        useCheckoutStore().cart = []
      }

      const existingDishIndex = useCheckoutStore().cart.findIndex(item => item.dishes.name === dish.name);

      console.log(existingDishIndex);

      if (existingDishIndex !== -1) {
        // If the dish is already in the cart, update its quantity
        useCheckoutStore().cart[existingDishIndex].dishes.quantity += this.quantities[dish.id] || 1;
      } else {
        // If the dish is not in the cart, add a new instance with quantity 1
        const dishWithQuantity = {
          restaurant: {
            name: this.singleRestaurant.name,
            id: this.singleRestaurant.id,
            slug: this.singleRestaurant.slug
          },
          dishes: {
            name: dish.name,
            price: Number(dish.price),
            description: dish.description,
            img: dish.img,
            quantity: this.quantities[dish.id] || 1,
            id: dish.id,
          }
        }


        // Push the dish with quantity to the cart
        useCheckoutStore().cart.push(dishWithQuantity);
        console.log(useCheckoutStore().cart);

      }
    },

    // Function to increment the quantity of a dish in the cart
    incrementQuantityCart(dish) {

      const existingItemIndex = useCheckoutStore().cart.findIndex(item => item.dishes.name === dish.name);

      if (existingItemIndex !== -1) {
        // If the dish is in the cart, increment its quantity
        useCheckoutStore().cart[existingItemIndex].dishes.quantity += 1;

      }
    },

    // Function to decrement the quantity of a dish in the cart
    decrementQuantityCart(dish) {
      const existingItemIndex = useCheckoutStore().cart.findIndex(item => item.dishes.name === dish.name);

      if (existingItemIndex !== -1) {
        // If the dish is in the cart and its quantity is greater than 1, decrement the quantity
        if (useCheckoutStore().cart[existingItemIndex].dishes.quantity > 1) {

          useCheckoutStore().cart[existingItemIndex].dishes.quantity -= 1;

        } else {
          // Optionally, remove the item from the cart if the quantity becomes 0
          useCheckoutStore().cart.splice(existingItemIndex, 1);
        }
      }
      // You can add additional logic if the item is not found (optional)
    },

    showCheckout() {
      return this.dishes.some(dish => dish.restaurant === this.selectedRestaurant);
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

    svuota() {
      const filteredCart = useCheckoutStore().cart.filter(item => item.restaurant.name === this.singleRestaurant.name);

      // Loop through the items in filteredCart and remove them from the cart
      for (const item of filteredCart) {
        const index = useCheckoutStore().cart.indexOf(item);
        if (index !== -1) {
          useCheckoutStore().cart.splice(index, 1);
        }
      }
      // Reset other related properties
      useCheckoutStore().restaurantCartTotal = 0;
      this.state.prezzo = 0;
    }, 
  },


  mounted() {

    axios.get(this.base_url + `api/restaurants/user/${this.$route.params.slug}`)
      .then(response => {
        console.log('topperia');
        console.log(`http://localhost:8000/api/restaurants/user/${this.$route.params.slug}`);

        this.singleRestaurant = response.data.result;

        this.dishes = response.data.result.dish[0].user_id
        console.log(this.dishes);

        console.log(this.singleRestaurant);
        useCheckoutStore().setSingleRestaurant(this.singleRestaurant); // Aggiorna singleRestaurant nel tuo store Pinia
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
      <div class="col-lg-9 col-12">

        <div class="row row-cols-1 row-cols-xl-2">

          <!-- dinamic generation of dish column with cards -->
          <div v-for="dish in singleRestaurant.dish" class="col pb-3">

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
                    <p class="text-truncate">
                      {{ dish.ingredients }}
                    </p>
                  </div>

                </div>

                <!-- bottom column with price and action -->
                <div class="col-12">

                  <div class="row row-cols-sm-2 justify-content-between align-items-center">

                    <!-- price -->
                    <div class="fs-5 fw-bolder col">
                      €{{ dish.price }}
                    </div>

                    <!-- actions -->
                    <div class="col">
                      <div id="actions" class="d-flex justify-content-evenly align-items-center">
                        <div class="d-flex align-items-center">
                          <button class="btn btn-primary" @click="decrementQuantity(dish)">
                          -
                          </button>

                          <div class="counter px-4">
                            <span class="fs-5">
                              {{ quantities[dish.id] || 1 }}
                            </span>
                          </div>

                          <button class="btn btn-primary me-2" @click="incrementQuantity(dish)">
                            +
                          </button>
                        </div>
                        

                        <button class="btn btn-primary mr-2" @click="addToCart(dish)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                          </svg>
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


      <!-- col with checkout order -->
      <div class="col-12 col-lg-3">

        <!-- card with order -->
        <div class="card checkout text-break text-center">

          <h4 class="py-3">
            Your order
          </h4>

          <div class="card-body p-2">

            <!-- view if no element on cart -->
            <p v-if="filteredCart.length === 0" class="fw-bold">
              Non hai aggiunto prodotti al momento, quando lo farai appariranno qua!
            </p>

            <!-- wrapper for all carts infos and items -->
            <div v-else>

              <!-- view you add element on cart -->
              <ul class="list-unstyled">

                <!-- vfor to generate li orders -->

                <li v-for="(dish, index) in filteredCart" :key="index" class="pb-3">
                  <div class="d-flex justify-content-between align-items-center">

                    <!-- decrement -->
                    <button class="btn my_check_btn" @click="decrementQuantityCart(dish.dishes)">
                      -
                    </button>

                    <!-- name order with counter -->
                    <span class="px-3 fw-semibold">
                      {{ dish.dishes.name }} - {{ dish.dishes.quantity }}x
                    </span>

                    <!-- increment -->
                    <button class="btn my_check_btn" @click="incrementQuantityCart(dish.dishes)">
                      +
                    </button>

                  </div>
                </li>
              </ul>

              <!-- checkout button -->
              <div class="text-center py-3">

                <router-link :to="{ name: 'CheckoutView', params: { slug: singleRestaurant.slug } }">
                  <button class="btn">
                    Go to Checkout
                  </button>
                </router-link>

                <button class="btn ms-3" @click="svuota()">
                  <i class="fa-solid fa-trash"></i>
                </button>

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

h1 {
  color: $d_boo_orange;
}

img {
  max-height: 100px;
  max-width: 125px;
  min-height: 100px;
  min-width: 125px;
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
  min-height: 210px;
  transition: .2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

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