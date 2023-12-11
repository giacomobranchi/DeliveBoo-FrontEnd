import { reactive } from "vue";
import axios from 'axios';


export const state = reactive({
    base_url: 'http://127.0.0.1:8000/',
    cart: [],
        

    fetchRestaurants() {
        axios.get(this.base_url + 'api/restaurants/')
            .then(response => {
                this.restaurants = response.data.result;
            }).catch(err => {
                console.error(err);
            })
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