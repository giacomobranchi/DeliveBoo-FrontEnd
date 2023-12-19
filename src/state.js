import { reactive } from "vue";
import axios from 'axios';


export const state = reactive({
    base_url: 'http://127.0.0.1:8000/',
    selectedTypes: [],
    selectedTypeParams: '',

    async fetchRestaurants() {
        const fetchedRestaurants = await axios.get(this.base_url + 'api/restaurants/')
            .then(response => {
                this.restaurants = response.data.result;
            }).catch(err => {
                console.error(err);
            })
        return fetchedRestaurants
    },
    fetchTypes() {
        axios.get(this.base_url + 'api/types/')
            .then(response => {
                this.types = response.data.result;
                console.log(this.types);
            }).catch(err => {
                console.error(err);
            })
    },

    /* fetchSingleRestaurant() {
        axios.get(this.base_url + `api/restaurants/${this.$route.params.slug}`)
            .then(response => {
                console.log('topperia');
                console.log(`http://localhost:8000/api/restaurants/${this.$route.params.slug}`);
                this.singleRestaurant = response.data.result;
            }).catch(err => {
                console.error(err);
            })
    }, */
})


// Store Pinia per CheckoutView
import { defineStore } from 'pinia';

export const useCheckoutStore = defineStore({
    id: 'checkout',
    state: () => ({
        cart: [],
        restaurantCartTotal: 0,
        prezzo: 0,
        singleRestaurant: null, // Aggiungi singleRestaurant allo stato del tuo store
        // altri stati...
    }),
    actions: {
        addToCart(dish) {
            // il tuo metodo addToCart...
        },
        setSingleRestaurant(restaurant) {
            // Aggiungi un metodo per aggiornare singleRestaurant

            this.singleRestaurant = restaurant;
        },
        // altre azioni...
    },
    persist: true, // Add this line to persist the state of this store
});