<script>
import axios from 'axios';
import { state } from '../state';

export default {
    name: 'AppHome',

    data() {
        return {
            state,
            restaurants_api: 'http://127.0.0.1:8000/api/restaurants',
            types_api: 'http://127.0.0.1:8000/api/types',
            restaurants: [],
            displayedRestaurants: [],
            types: [],
            items: 8,
            checked: false,
        }
    },

    components: {

    },

    mounted() {
        axios
            .get(this.restaurants_api)
            .then(response => {
                this.restaurants = response.data.result
                this.displayedRestaurants = this.restaurants.slice(0, this.items)

                console.log(this.restaurants);
            })

        axios
            .get(this.types_api)
            .then(response => {

                this.types = response.data.result
                console.log(this.types);
            })

    },

    methods: {

        isChecked(value) {
            return this.state.selectedTypes.includes(value)
        },

        filterRestaurants() {
            this.state.selectedTypeParams = this.state.selectedTypes.join('');
            //this.$router.push({ name: 'allRestaurantsList' });
        }
    }
}    
</script>
<template>
    <section id="jumbotron">

        <h1 class="py-5 text-center">
            Welcome to DeliveBoo!
        </h1>

    </section>

    <div class="container">

        <!-- restaurants section -->
        <section id="restaurants">
            <h2 class="mb-5">
                Look at our restaurants selection!
            </h2>

            <!-- restaurants cards -->
            <div class="row g-1 pb-5">
                <div v-for="restaurant in this.displayedRestaurants" class="col-3">

                    <div class="my_card">
                        <router-link :to="{ name: 'singleRestaurant', params: { slug: restaurant.slug } }"
                            class="text-decoration-none">
                            <h6 class="pb-1">
                                {{ restaurant.name }}
                            </h6>
                            <p class="text-light m-0">
                                <i class="fa-solid fa-location-dot fa-xl text-dark me-1"></i>
                                {{ restaurant.address }}
                            </p>
                        </router-link>
                    </div>

                </div>

                <!-- to all restaurants button -->
                <button class="my_btn_rest my-4" v-if="this.displayedRestaurants < this.restaurants">
                    <router-link to="/all-restaurants" class="text-decoration-none">
                        <h6>
                            Look at all our restaurants!
                        </h6>
                    </router-link>
                </button>

            </div>
        </section>

        <!-- types section -->
        <section id="types" class="pb-5">

            <h2 class="mb-5">
                What do you like to eat?
            </h2>

            <!-- types cards -->

            <!-- <div class="my_card_types">

                        <input type="checkbox" name="{{ single_type.name }}" id="">
                        <h6>
                            {{ single_type.name }}
                        </h6>

                    </div> -->

            <div class="row g-3 pb-5">

                <div v-for="( single_type, index ) in    this.types   " :key="single_type.id" class="col-3">

                    <div class="form-check my_card_types"
                        :class="{ 'active': isChecked('types[]=' + single_type.slug + '&') }">

                        <div class="text-decoration-none m-1 text-center" :key="single_type.slug">

                            <input v-model="this.state.selectedTypes" class="form-check-input d-none" :for="single_type.id"
                                type="checkbox" :value="'types[]=' + single_type.slug + '&'" :id="single_type.id" />
                            <label class="form-check-label w-100 text-light" :for="single_type.id">
                                {{ single_type.name }}
                            </label>

                        </div>

                    </div>

                </div>

                <button class="my_btn_types my-4">
                    <router-link :to="{ name: 'allRestaurantsList', params: { slug: this.state.selectedTypeParams } }"
                        class="text-decoration-none" @click="filterRestaurants">
                        <h6>
                            Filtra ristoranti
                        </h6>
                    </router-link>
                </button>

            </div>


        </section>

    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;

#jumbotron {
    background-image: url(../assets/img/Capture.PNG);
    background-size: contain;
    height: 50vh;
}

h2 {
    text-align: center;
    padding: 2rem;
    color: $d_boo_orange;
}

h6 {
    margin: 0;
    color: black;
}

.my_card {
    background-color: $d_boo_orange;
    border-radius: 5px;
    padding: 1rem .7rem;
    transition: .3s ease-in-out;
    border: 1px solid transparent;

    h6 {
        color: $d_boo_bg;
    }

    &:hover {
        transform: scale(1.05);
        border: 1px solid white;
        cursor: pointer;
        box-shadow: inset 0px 0px 5px 0px white;
    }

}

.my_card_types {
    background-color: black;
    border-radius: 5px;
    padding: 1.4rem;
    transition: .3s ease-in-out;
    border: 1px solid transparent;

    h6 {
        color: $d_boo_orange;
    }

    &:hover {
        transform: scale(1.05);
        border: 1px solid $d_boo_orange;
        cursor: pointer;
        box-shadow: inset 0px 0px 5px 0px $d_boo_orange;
    }
}

.active {
    transform: scale(1.05);
    border: 1px solid $d_boo_orange;
    cursor: pointer;
    box-shadow: inset 0px 0px 5px 0px $d_boo_orange;
}



.my_btn_types {
    background-color: $d_boo_orange;
    width: 15%;
    margin: auto;
    padding: 1rem;
    border-radius: 10px;
    font-weight: 600;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid black;
        box-shadow: inset 0px 0px 5px 0px black;
    }

}

.my_btn_rest {
    background-color: black;
    width: 25%;
    margin: auto;
    padding: 1rem;
    border-radius: 10px;
    font-weight: 600;
    border: 1px solid transparent;

    h6 {
        color: $d_boo_orange;
    }

    &:hover {
        border: 1px solid $d_boo_orange;
        box-shadow: inset 0px 0px 5px 0px $d_boo_orange;
    }

}
</style>