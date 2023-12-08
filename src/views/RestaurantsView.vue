<script>
import { state } from '../state.js';
export default {
    name: 'RestaurantsView',
    components: {},
    data() {
        return {
            state,

        }
    },


    mounted() {
        this.state.fetchRestaurants()
    }
}
</script>

<template>
    <div v-for="restaurant in   this.state.restaurants  ">

        <h2>{{ restaurant.name }}</h2>

        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }">View
            restaurant</router-link>


    </div>
</template>

<style lang="scss"></style>