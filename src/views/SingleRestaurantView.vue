<script>
import { state } from '../state.js';
import axios from 'axios';
export default {
    name: 'SingleRestaurant',
    components: {},
    data() {
        return {
            state,
            singleRestaurant: null,
            base_url: 'http://127.0.0.1:8000/',

        }
    },


    mounted() {
        axios.get(this.base_url + `api/restaurants/${this.$route.params.slug}`)
            .then(response => {
                console.log('topperia');
                console.log(`http://localhost:8000/api/restaurants/${this.$route.params.slug}`);
                this.singleRestaurant = response.data.result;
            }).catch(err => {
                console.error(err);
            })
    }
}
</script>

<template>
    <div v-if="singleRestaurant">
        <h2>{{ singleRestaurant.name }}</h2>
    </div>
</template>

<style lang="scss"></style>