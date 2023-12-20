<script>
import { useCheckoutStore } from '../state.js';
import axios from 'axios';
import { state } from '../state.js';

export default {
  name: 'CheckoutView',
  data() {
    const checkoutStore = useCheckoutStore();
    return {
      state,
      checkoutStore, // Aggiungi la definizione di singleRestaurant qui se necessario
      isTop: true,
    };
  },
  methods: {

    pushTotal(price) {
      useCheckoutStore().prezzo = 0
      useCheckoutStore().prezzo = price
    },

    //total price for each dish
    calculateTotalPrice(item) {
      return (item.quantity * item.price).toFixed(2);
    },

    //total for each restaurants
    calculateRestaurantTotal(restaurantOrders) {
      let total = 0;
      restaurantOrders.forEach(order => {
        total += parseFloat(this.calculateTotalPrice(order.dishes));
      });

      return total.toFixed(2);
    },

    pushTotal(price, restaurantOrders) {
      useCheckoutStore().prezzo = 0
      useCheckoutStore().prezzo = price

      useCheckoutStore().singleRestaurant = restaurantOrders[0].restaurant
      console.log(useCheckoutStore().singleRestaurant);

    },

    //total price for all rest orders
    calculateTotalForAllOrders() {
      let total = 0;
      this.checkoutStore.cart.forEach(order => {
        total += parseFloat(this.calculateTotalPrice(order.dishes));
      });
      return total.toFixed(2);
    },

    // Get unique restaurants from the cart
    getUniqueRestaurants() {
      const uniqueRestaurants = [];
      const visitedRestaurants = new Set();

      this.checkoutStore.cart.forEach(order => {
        if (!visitedRestaurants.has(order.restaurant.id)) {
          visitedRestaurants.add(order.restaurant.id);
          uniqueRestaurants.push(this.checkoutStore.cart.filter(o => o.restaurant.id === order.restaurant.id));
        }
      });

      return uniqueRestaurants;
    },

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

    emptyCart() {
      this.checkoutStore.cart = [];

    },
    goBack() {
      this.$router.go(-1);
    },
    removeItem(index) {
      this.checkoutStore.cart.splice(index, 1);
    },
    backToTop() {
      window.scrollTo(0, 0);
    },
  },
  mounted() {

    console.log(this.checkoutStore.cart);

    window.addEventListener('scroll', () => {
      this.isTop = scrollY > 100 ? false : true;
    });
  },
};
</script>


<template>
  <main id="container_cart">

    <div class="container">
      <h1 class="text-center mb-3 pt-3">Carrello</h1>

      <!-- Iterate over unique restaurants in the cart -->
      <div id="single_cart" v-for="(restaurantOrders, restaurantIndex) in  getUniqueRestaurants() " :key="restaurantIndex"
        class="border-bottom border-black pb-5 mb-5">

        <router-link :to="{ name: 'singleRestaurant', params: { slug: restaurantOrders[0].restaurant.slug } }"
          class="text-decoration-none">
          <h2 class="text-center my-4 p-2 border border-2 rounded-5 border-black">
            {{ restaurantOrders[0].restaurant.name }}
          </h2>
        </router-link>


        <div class="row">

          <!-- iterate over each restaurant order -->
          <div v-for="(order, orderIndex) in restaurantOrders" :key="orderIndex" class="col-lg-6 col-12 mb-3">

            <!-- card for each item -->
            <div class="card my_card d-flex flex-row justify-content-between align-items-center shadow">


              <div class="col-lg-3">
                <img v-if="order.dishes.img.indexOf('http') !== -1" :src="order.dishes.img" alt="External Image"
                  class="img-fluid rounded-2">
                <img v-else :src="this.state.base_url + 'storage/' + order.dishes.img" alt="Local Image"
                  class="img-fluid rounded-2">
              </div>

              <div class="col-lg-5 col-5">
                <h5 class="card-title mb-3">{{ order.dishes.name }}</h5>
                <p class="card-text mb-3">Quantità : {{ order.dishes.quantity }}</p>
                <p class="card-text mb-3">Totale: € {{ calculateTotalPrice(order.dishes) }}</p>
              </div>

              <!-- actions -->
              <div class="col-lg-3 col-3 d-flex flex-column align-items-center">

                <!-- decrement -->
                <button class="btn" @click="decrementQuantityCart(order.dishes)">
                  -
                </button>

                <!-- increment -->
                <button class="btn my-2" @click="incrementQuantityCart(order.dishes)">
                  +
                </button>

                <!-- delete -->
                <button class="btn" @click="removeItem(orderIndex)">
                  <i class="fa-solid fa-trash"></i>
                </button>


              </div>

            </div>

          </div>

          <!-- total price for everything -->
          <h4 class="text-center my-3">
            Totale: € {{ calculateRestaurantTotal(restaurantOrders) }}
          </h4>


          <!-- actions section for single rest -->
          <div class="col-12 d-flex justify-content-around">

            <div class="col-5">
              <router-link class="fw-bold border-2 w-100"
                :to="{ name: 'singleRestaurant', params: { slug: restaurantOrders[0].restaurant.slug } }">
                <button class="btn text-light w-100">
                  Torna al ristorante
                </button>
              </router-link>
            </div>

            <div class="col-5">
              <button class="btn h-100 w-100"
                @click="pushTotal(calculateRestaurantTotal(restaurantOrders), restaurantOrders)">
                <router-link :to="{ name: 'PaymentView', params: { 'user_id': restaurantOrders[0].restaurant.id } }"
                  class="text-decoration-none text-light">
                  Procedi al pagamento
                </router-link>
              </button>

            </div>


          </div>


        </div>

      </div>


      <!-- if cart is empty -->
      <h2 v-if="checkoutStore.cart.length === 0" class="text-center my-5 rounded-5 p-3">

        Il carrello è vuoto

      </h2>

      <!-- if cart has items -->
      <div v-else>

        <h2 class="text-center my-5 rounded-5 p-3">
          Totale ordine: € {{ calculateTotalForAllOrders() }}
        </h2>

        <div class="d-flex justify-content-center flex-wrap mb-5 gap-2">

          <button class="btn btn-outline-danger text-dark border-2" @click="emptyCart">Svuota il carrello</button>

        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button v-if="!isTop" @click="backToTop" class="scrollToTop btn">
          <i class="fas fa-angle-up"></i>
        </button>
      </div>
    </div>
  </main>
</template>
  
<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

#container_cart {
  background-color: $d_boo_orange;
  min-height: 100vh;

  h2 {
    background-color: black;
    color: $d_boo_orange;
  }

  .card_body {

    img {
      width: 200px;
      height: 150px;
      object-fit: cover;
      border-radius: 10px;
      border: 1px solid black;
    }

    &:hover {
      cursor: pointer;
      background-color: antiquewhite;
      border-radius: 10px;
    }
  }

  .scrollToTop {
    width: 50px;
    height: 50px;
    color: $d_boo_bg;
    background-color: $d_boo_orange;
    border: 2px solid $d_boo_bg;

    &:hover {
      background-color: $d_boo_bg;
      color: $d_boo_orange;
      border: 2px solid $d_boo_bg;
    }
  }
}

.my_card {
  border: 2px solid black;
  border-width: 2px;
  padding: 1rem;

  img {
    height: 130px;
    width: 160px;
  }


  &:hover {
    transform: scale(1.01);
  }

}

#single_cart {

  button {
    background-color: black;
    color: $d_boo_orange;
    border: 1px solid $d_boo_orange;
    font-weight: 600;
    width: 50%;

    &:hover {
      background-color: $d_boo_bg;
    }
  }
}
</style>
                  