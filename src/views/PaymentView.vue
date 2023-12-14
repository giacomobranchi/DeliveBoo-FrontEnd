<script>
import { state } from '../state.js';
import axios from 'axios';
import braintree from 'braintree-web';

export default {
  name: 'PaymentView',
  data() {
    return {
      state,
      hostedFieldInstance: false,
      amount: '',
      nonce: '',
      error: '',
    }
  },
  methods: {
    payWithCreditCard() {
      if (this.hostedFieldInstance) {
        this.error = "";
        this.nonce = "";
        this.hostedFieldInstance.tokenize().then(payload => {
          console.log(payload);
          this.nonce = payload.nonce;

          // Aggiungi la chiamata <link>axios</link> per inviare i dati al backend
          axios.post(this.state.base_url + 'api/payment', {
            amount: this.amount,
            nonce: this.nonce
          }).then(response => {
            console.log(response);
            // Gestisci la risposta dal backend, ad esempio:
            if (response.data.success) {
              // Se il backend restituisce un messaggio di successo, gestiscilo qui
              console.log("Pagamento completato con successo!");
            } else {
              // Se il backend restituisce un messaggio di errore, gestiscilo qui
              console.error("Errore durante il pagamento: " + response.data.error);
            }
          }).catch(error => {
            console.error(error);
            // Gestisci l'errore della chiamata al backend, se necessario
          });
        })
          .catch(err => {
            console.error(err);
            this.error = err.message;
          })
      }
      console.log(this.amount);
    },
    /*    payWithCreditCard() {
         if (this.hostedFieldInstance) {
   
           this.error = "";
           this.nonce = "";
           this.hostedFieldInstance.tokenize().then(payload => {
             console.log(payload);
             this.nonce = payload.nonce
           })
             .catch(err => {
               console.error(err);
               this.error = err.message;
             })
         }
         console.log(this.amount);
       }, */
    /*     fetchPayments() {
          axios.post(this.state.base_url + 'payment')
            .then(response => {
              console.log(response);
    
    
            })
        }, */
  },
  computed: {

  },
  mounted() {
    braintree.client.create({
      authorization: "sandbox_s9gw8n2j_h7vcm998tqqpwgc3"
    })
      .then(clientInstance => {
        let options = {
          client: clientInstance,
          styles: {
            input: {
              'font-size': '14px',
              'font-family': 'Open Sans'
            }
          },
          fields: {
            number: {
              selector: '#creditCardNumber',
              placeholder: 'Enter Credit Card'
            },
            cvv: {
              selector: '#cvv',
              placeholder: 'Enter CVV'
            },
            expirationDate: {
              selector: '#expireDate',
              placeholder: '00 / 0000'
            }
          }
        }
        return braintree.hostedFields.create(options)
      })
      .then(hostedFieldInstance => {
        // @TODO - Use hostedFieldInstance to send data to Braintree
        this.hostedFieldInstance = hostedFieldInstance;
      })
      .catch(err => {
      });
  }
}
</script>

<template>
  <div class="container">
    <div class="col-6 offset-3">
      <div class="card bg-light">
        <div class="card-header">Payment Information</div>
        <div class="card-body">


          <div class="alert alert-success" v-if="nonce">
            Successfully generated nonce.
          </div>

          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>

          <form>
            <div class="form-group">
              <label for="amount">Amount</label>
              <div class="input-group">
                <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                <input type="number" v-model="amount" id="amount" class="form-control" placeholder="Enter Amount">
              </div>
            </div>
            <hr />
            <div class="form-group">
              <label>Credit Card Number</label>
              <div id="creditCardNumber" class="form-control"></div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-6">
                  <label>Expire Date</label>
                  <div id="expireDate" class="form-control"></div>
                </div>
                <div class="col-6">
                  <label>CVV</label>
                  <div id="cvv" class="form-control"></div>
                </div>
              </div>
            </div>
            <button class="btn btn-primary btn-block" @click="payWithCreditCard">Enter</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

  
<style lang="scss">
@use '../assets/scss/partials/variables' as *;
</style>