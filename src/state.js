import { reactive } from "vue";
import axios from 'axios';


export const state = reactive({
    base_url: 'http://127.0.0.1:8000/',
    cart: [],
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

})    