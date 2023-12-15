<script>
import { useCheckoutStore } from '../state';
import { state } from '../state.js';

export default {
  name: 'CheckoutView',
  data() {
    const checkoutStore = useCheckoutStore();
    return {
      state,
      checkoutStore,
      singleRestaurant: null, // Aggiungi la definizione di singleRestaurant qui se necessario
      isTop: true,
    };
  },
  methods: {
    checkout() {
      axios.post(this.checkoutStore.base_url + 'api/checkout', this.checkoutStore.cart)
        .then(response => {
          console.log(response);
          this.checkoutStore.cart = [];
        })
        .catch(err => {
          console.error(err);
        });
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
  computed: {
    total() {
      let total = this.checkoutStore.cart.reduce((total, dish) => total + dish.price * dish.quantity, 0);
      return total.toFixed(2);
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.isTop = scrollY > 100 ? false : true;
    });
  },
};
</script>


<template>
  <main id="container_cart">

    <div class="container">

      <div class="row">
        <div class="col-12">
          <h1 class="text-center mb-3 p-5">Benvenuti al Carrello -{{ checkoutStore.singleRestaurant.name }}-</h1>
          <div v-for="(dish, index) in checkoutStore.cart" class="card mb-3">
            <div class="card-body d-flex justify-content-around shadow flex-wrap  card_body">
              <div class="col-12 col-md-6 col-lg-3">
                <img v-if="dish.img.indexOf('http') !== -1" :src="dish.img" alt="External Image">
                <img v-else :src="this.state.base_url + 'storage/' + dish.img" alt="Local Image">
              </div>
              <div class="col-12 col-md-6 col-lg-3  mx-5">
                <h5 class="card-title mb-3">{{ dish.name }}</h5>
                <hr>
                <p class="card-text mb-3">Prezzo: € {{ dish.price }}</p>
                <p class="card-text mb-3">Quantita': {{ dish.quantity }}pz</p>
              </div>
              <div class="col-12 col-md-12 col-lg-3 mb-3">
                <h5>Descrizione prodotto</h5>
                <hr>
                <p class="card-text">{{ dish.description }}</p>
              </div>
              <div class="col-12 col-lg-3">
                <button class="btn btn-danger mr-2 mx-2" @click="removeItem(index)"><i
                    class="fa-solid fa-trash"></i></button>
              </div>
            </div>

          </div>
          <h1 class="text-center my-5">Totale: € {{ total }}</h1>
          <div class="d-flex justify-content-center flex-wrap mb-5 gap-2">
            <button class="btn btn-outline-secondary text-dark border-2" @click="goBack">Torna indietro</button>
            <button class="btn btn-outline-danger text-dark border-2" @click="emptyCart">Svuota il carrello</button>
            <button class="btn btn-outline-primary text-dark border-2" @click="checkout">Procedi al Pagamento</button>
          </div>
          <div class="d-flex justify-content-end fixed-bottom mx-5">
            <button v-if="!isTop" @click="backToTop" class="scrollToTop"><i class="fas fa-angle-up"></i></button>
          </div>
        </div>
      </div>
      <div v-if="checkoutStore.cart.length === 0" class="row text-center">
        <div class="col-12 vh-100 text-white my-5 ">
          <h1 class="text-center pb-5">Il tuo carrello e' vuoto</h1>
          <!-- <button class="btn btn-outline-secondary text-dark border-2" @click="goBack">Torna indietro</button> -->
        </div>
      </div>
    </div>

  </main>
</template>
  
<style lang="scss">
@use '../assets/scss/partials/variables' as *;

#container_cart {
  background-color: $d_boo_orange;
  min-height: 100vh;

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
    font-size: 20px;
    border-bottom: none;
    color: $d_boo_orange;

    &:hover {
      background-color: $d_boo_orange;
      color: $d_boo_light;
      border: 2px solid;
      border-bottom: none;

    }
  }
}
</style>
                  