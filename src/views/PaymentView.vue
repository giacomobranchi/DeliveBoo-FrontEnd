<script>
import axios from "axios";
import braintree from "braintree-web";
import { state } from '../state.js';
import { useCheckoutStore } from '../state';

export default {
  data() {
    const checkoutStore = useCheckoutStore();
    return {
      checkoutStore,
      state,
      title: "Pagina Pagamento",
      cart: [],
      total_price: 0,
      hostedFieldInstance: false,
      nonce: "",
      error: "",
      success: '',

      // logica braintree
      braintreeClient: null,
      braintreeHostedFields: null,
      myUrl: "http://localhost:8000",
      error: {},
      payLoad: false,

      //   oggetto che si riempie all'inserimento dei dati
      formData: {
        ui_name: "",
        ui_address: "",
        ui_phone: "",
        ui_mail: "",
        total_price: 0,
        user_id: '',
        success: true,
        dishes: []
      },
      errors: {
        ui_name: "",
        ui_address: "",
        ui_phone: "",
        ui_mail: ""
      },
    };
  },
  created() {

    this.cart = this.checkoutStore.cart;
    /* this.total_price = calculateRestaurantTotal().cart.reduce((total, dish) => total + dish.price * dish.quantity, 0);*/
    this.total_price = useCheckoutStore().prezzo
    this.initializeBraintree();
    this.formData.total_price = useCheckoutStore().prezzo
    this.formData.dishes = this.checkoutStore.cart.filter(item => item.restaurant.id === this.checkoutStore.singleRestaurant.id).map(item => ({ id: item.dishes.id, quantity: item.dishes.quantity }))
    this.formData.user_id = parseInt(this.$route.params.user_id)

  },
  /* "SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'total_price' cannot be null (Connection: mysql, SQL: insert into `orders` (`ui_name`, `ui_address`, `ui_phone`, `ui_mail`, `total_price`, `updated_at`, `created_at`) values (Giacomo Branchi, Via Marzabotto 2, 3701069657, jack.bra99@gmail.com, ?, 2023-12-16 16:05:13, 2023-12-16 16:05:13))" */

  methods: {
    // Controllo validazione input
    submitForm() {
      if (!this.formData.ui_name) {
        this.errors.ui_name = "Inserisci il nome.";
        return;
      } else {
        this.errors.ui_name = "";
      }
      if (!this.formData.ui_address) {
        this.errors.ui_address = "Inserisci l'indirizzo.";
        return;
      } else {
        this.errors.ui_address = "";
      }
      if (!this.formData.ui_phone) {
        this.errors.ui_phone = "Inserisci un numero di telefono.";
        return;
      } else {
        this.errors.ui_phone = ""; // Cancella eventuali errori precedenti
      }

      if (isNaN(this.formData.ui_phone)) {
        this.errors.ui_phone = "Inserisci un numero di telefono valido.";
        return;
      } else {
        this.errors.ui_phone = ""; // Cancella eventuali errori precedenti
      }
      if (!this.formData.ui_mail) {
        this.errors.ui_mail = "Inserisci un indirizzo mail valido.";
        return;
      } else {
        this.errors.ui_mail = "";
      }

      this.payWithCard();
      // Aggiungi l'array cart al formData
      this.formData.cart = this.cart;
      // chiamata axios che manda i dati al back-end (Orders)
      //this.formData.total_price = 10
      axios
        .post("http://localhost:8000/api/orders", this.formData)
        .then((response) => {

          this.success = response.data

          console.log("Dati inviati con successo:", response.data);
        })
        .catch(err => {
          console.error(err);
          this.error = err.message;
        })
    },
    // pulizia carrello

    clearCartForSelectedRestaurant() {
      // Get the selected restaurant from the store
      const selectedRestaurant = useCheckoutStore().singleRestaurant;

      // Filter cart items for the selected restaurant
      const itemsToRemove = useCheckoutStore().cart.filter(item => item.restaurant.id === selectedRestaurant.id);

      // Remove those items from the cart
      itemsToRemove.forEach(item => {
        const index = useCheckoutStore().cart.indexOf(item);
        useCheckoutStore().cart.splice(index, 1);
      });

      this.saveCart();
      useCheckoutStore().restaurantCartTotal = 0;
      useCheckoutStore().prezzo = 0;
      this.showModal = false;
      this.showModalemptyCart = false;
    },

    saveCart() {
      let parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
      // window.dispatchEvent(new Event("cart-updated"));
    },

    // RICHIESTA GET PER IL TOKEN BRAINTREE
    async initializeBraintree() {
      try {
        const resp = await axios.get("http://localhost:8000/api/generate");
        const token = resp.data.token;

        const client = await braintree.client.create({
          authorization: token,
        });

        // Resto del codice per la gestione del cliente Braintree
        const hostedFieldsInstance = await braintree.hostedFields.create({
          client,
          styles: {
            input: {
              "font-size": "14px",
              "font-family": "Open Sans",
            },
          },
          fields: {
            number: {
              selector: "#creditCardNumber",
              placeholder: "Inserisci numero carta",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "Inserisci CVV",
            },
            expirationDate: {
              selector: "#expireDate",
              placeholder: "MM / AAAA",
            },
          },
        });


        this.braintreeHostedFields = hostedFieldsInstance;
      } catch (error) {
        console.error("Error fetching or using the token:", error);
      }
    },


    // RICHIESTA AXIOS POST PER INVIARE I DATI AL BACK END
    payWithCard() {
      if (this.braintreeHostedFields) {
        this.payLoad = true;
        this.error = "";

        this.braintreeHostedFields.tokenize().then((payload) => {
          axios
            .post("http://localhost:8000/api/payment", {
              amount: Number(this.total_price),
              token: payload.nonce,
            })
            .then((resp) => {
              this.clearCartForSelectedRestaurant();
              this.payLoad = false;
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    },
  },
};
</script>

<template>
  <div class="total-cont">
    <div class="container form">
      <h1>{{ title }}</h1>
      <div class="mb-3">
        <em>I campi contrassegnati con "<span class="text-danger">*</span>" sono
          obbligatori.</em>
      </div>

      <form @submit.prevent="submitForm">
        <!--* contenuto del form (dati utente) -->
        <div class="row">
          <div class="col-lg-6 my-2">
            <label for="name" class="form-label">Nome<span class="text-danger">*</span></label>
            <input v-model="formData.ui_name" type="text" name="name" id="name" class="form-control"
              :class="{ 'is-invalid': errors.ui_name }" placeholder="Es. Federica / Fabio" />
            <div class="invalid-feedback">{{ errors.ui_name }}</div>
          </div>
          <div class="col-lg-4 my-2">
            <label for="address" class="form-label">Indirizzo<span class="text-danger">*</span></label>
            <input v-model="formData.ui_address" type="text" name="address" id="address" class="form-control"
              :class="{ 'is-invalid': errors.ui_address }" placeholder="Es. Via Cerasi 4" />
            <div class="invalid-feedback">{{ errors.ui_address }}</div>
          </div>
          <div class="col-lg-4 my-2">
            <label for="phone" class="form-label">Numero<span class="text-danger">*</span></label>
            <input v-model="formData.ui_phone" type="text" name="phone" id="phone" class="form-control"
              :class="{ 'is-invalid': errors.ui_phone }" placeholder="Es. 3287485948" />
            <div class="invalid-feedback">{{ errors.ui_phone }}</div>
          </div>

          <div class="col-lg-4 my-2">
            <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
            <input v-model="formData.ui_mail" type="email" name="email" id="email" class="form-control"
              :class="{ 'is-invalid': errors.ui_mail }" placeholder="Es. FedericaRossi@live.it" />
            <div class="invalid-feedback">{{ errors.ui_mail }}</div>
          </div>
        </div>


        <!--* Template Carta nuovo  -->
        <div>
          <div class="form-group">
            <label class="text mt-3">
              Numero di carta di credito <span class="need text-danger">*</span>
            </label>
            <!--* Brand Icons -->
            <!--  <span class="brands-cont">
              <img src="../../../public/img/mastercard.png" alt="mastercard logo" />
              <img src="../../../public/img/paypal.png" alt="paypal logo" />
              <img src="../../../public/img/visa.svg.png" alt="visa logo" />
            </span> -->
            <div id="creditCardNumber" class="form-control mt-2">
              <span style="color: red" class="error-message" v-if="error.uiName">Es. 4111 1111 1111 1111</span>

            </div>
          </div>

          <div class="form-group">
            <div class="d-flex flex-wrap justify-content-between">
              <div class="col-md-6 col-12">
                <label class="text">
                  Data di scadenza
                  <span class="need text-danger">*</span></label>
                <div id="expireDate" class="form-control">
                  <span aria-required="true" style="color: red" class="error-message" v-if="error.uiName">Inserire data di
                    scadenza</span>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <label class="text">
                  CVV <span class="need text-danger">*</span></label>
                <div id="cvv" class="form-control">
                  <span style="color: red" class="error-message" v-if="error.uiName">Inserire CVV</span>
                </div>
              </div>
            </div>

          </div>

        </div>
        <div class="last-cont mt-2">
          <div class="total">
            <span><strong class="me-2">Totale:</strong>€ {{ this.total_price }}</span>
          </div>
          <div class="my-3">
            <div v-if="this.total_price <= 0" class="bg-danger p-3 rounded-3">
              <span>
                Carrello vuoto,
              </span>
              <router-link to="/all-restaurants">
                <span class="text-dark"> effettua un ordine.</span>
              </router-link>
            </div>
            <div v-else-if="success"></div>
            <button type="submit" v-else class="btn btn-checkout mb-3">
              <span class="">Ordina Adesso</span>
              <div v-show="payLoad" class="cell"></div>
            </button>
            <div class=" d-flex justify-content-end">
              <img width="50" src="../assets/img/Visa.png" style="margin-right : 1rem;" alt="">
              <img width="50" src="../assets/img/master_card.png" alt="">
            </div>
          </div>
        </div>
        <!-- <h3>Totale da pagare: € {{ this.total_price }}</h3>

        <button type="submit" class="btn btn-primary mt-4">Invia dati</button> -->
      </form>

      <!-- success message -->
      <div class="alert alert-success" v-if="success">
        Pagamento avvenuto con successo!
        <router-link to="/checkout">
          <span class="text-black">
            Torna al carrello
          </span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.total-cont {
  background-image: url(../../../public/img/pattern.png);
  background-position: center;
  background-repeat: repeat;
  background-size: 550px;
  padding-top: 55px;
  padding-bottom: 55px;

  .container.form {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}

#creditCardNumber {
  height: 50px;
  margin-bottom: 10px;
}

/* color: rgb(48, 169, 129); */
::placeholder {
  color: rgb(196, 196, 196);
}

.container {
  width: 80%;
  border: 2px solid rgb(48, 169, 129);
  padding: 35px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: white;

  h1 {
    color: rgb(234, 94, 61);
  }
}

.brands-cont {
  img {
    width: 20px;
    margin: 0px 10px;
  }
}

#expireDate {
  height: 50px;
  width: 90%;
}

#cvv {
  height: 50px;
  width: 90%;
}

.btn-checkout {
  background-color: rgb(48, 169, 129);
  color: rgb(255, 255, 255);
  font-weight: bold;

  &:hover {
    background-color: rgb(234, 94, 61) !important;
    color: white;
  }
}
</style>



<!-- essage
: 
"SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'total_price' cannot be null (Connection: mysql, SQL: insert into `orders` (`ui_name`, `ui_address`, `ui_phone`, `ui_mail`, `total_price`, `updated_at`, `created_at`) values (Giacomo Branchi, Via Marzabotto 2, 3701069657, jack.bra99@gmail.com, ?, 2023-12-16 16:22:23, 2023-12-16 16:22:23))"
t

SQLSTATE[HY000]: General error: 1364 Field 'user_id' doesn't have a default value (Connection: mysql, SQL: insert into `orders` (`ui_name`, `ui_address`, `ui_phone`, `ui_mail`, `total_price`, `updated_at`, `created_at`) values (Giacomo Branchi, Via Marzabotto 2, 3701069657, jack.bra99@gmail.com, 10, 2023-12-16 16:40:19, 2023-12-16 16:40:19))"
t -->

