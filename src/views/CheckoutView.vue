<script>
import { state } from '../state.js';
import axios from 'axios';
export default {
  name: 'CheckoutView',
  data() {
    return {
      state,
      isTop: true
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
    },
    removeItem(index) {
    this.state.cart.splice(index, 1);
    },
    backToTop() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
  total() {
    let total = this.state.cart.reduce((total, dish) => total + dish.price * dish.quantity, 0);
    return total.toFixed(2);
  }
},
mounted() {
  this.$watch('state.cart', () => {
    this.total = this.state.cart.reduce((total, dish) => total + dish.price * dish.quantity, 0);
  });
  this.$nextTick(() => {
    this.total = this.state.cart.reduce((total, dish) => total + dish.price * dish.quantity, 0);
  });
  window.addEventListener('scroll', () => {
      this.isTop = scrollY > 100 ? false : true;
  });
 }
}
</script>

<template>
    <main id="container_cart">
      <div class="container">
        <div v-if="state.cart && state.cart.length" class="row">
          <div class="col-12">
            <h1 class="text-center m-3 ">Benvenuto al tuo Carrello</h1>
            <div v-for="(dish, index) in state.cart" class="card mb-3">
              <div class="card-body d-flex justify-content-around shadow flex-wrap  card_body">
                <img :src="this.state.base_url + 'storage/' + dish.img" class="img-fluid" alt="">
                <div class="mx-5">
                  <h5 class="card-title mb-3">{{ dish.name }}</h5>
                  <hr>
                  <p class="card-text mb-3">Price: € {{ dish.price }}</p>
                  <p class="card-text mb-3">Quantita': {{ dish.quantity }}</p>
                </div>
                <div>
                  <h5>Descrizione prodotto</h5>
                  <hr>
                  <p class="card-text">{{ dish.description }}</p>
                </div>
                <div>
                  <button class="btn btn-danger mr-2 mx-2" @click="removeItem(index)"><i class="fa-solid fa-trash"></i></button>
                </div>
              </div>
            
            </div>
            <h1 class="text-center my-5">Totale: € {{ total }}</h1>
            <div class="d-flex justify-content-center flex-wrap mb-5 gap-2">
              <button class="btn btn-outline-secondary text-dark border-2" @click="goBack">Torna indietro</button>
              <button class="btn btn-outline-danger text-dark border-2" @click="emptyCart">Svuota il carrello</button>
              <button class="btn btn-outline-primary text-dark border-2" @click="checkout">Procedi al Pagamento</button>
            </div>
            <div class="d-flex justify-content-end">
            <button v-if="!isTop" @click="backToTop" class="scrollToTop"><i class="fas fa-angle-up"></i></button>
            </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-12 vh-100 text-white m-5 text-center">
          <h1>Il tuo carrello e' vuoto</h1>
          <button class="btn btn-secondary" @click="goBack">Torna indietro</button>
        </div>
      </div>
    </div>
       
    </main>
</template>
  
<style lang="scss">
  @use '../assets/scss/partials/variables' as *;
  
  #container_cart {
    background-color: $d_boo_orange;
    
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
      }
    }

    .scrollToTop{
      width: 50px; 
      height: 50px; 
      font-size: 20px; 
      color: $d_boo_orange;
      &:hover {
      background-color: $d_boo_orange;
      color: $d_boo_light;
      border: 2px solid;
      
      }
    }
    
  }

</style>