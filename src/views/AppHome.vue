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
            this.$router.push({ name: 'allRestaurantsList', params: { slug: this.state.selectedTypeParams } });
        }
    }
}    
</script>
<template>
    <section id="jumbotron" class="py-5">

    </section>

    <div class="container">

        <!-- restaurants section -->
        <section id="restaurants">
            <h2 class="mb-5">
                Look at our restaurants selection!
            </h2>

            <!-- restaurants cards -->
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-1 pb-5">
                <div v-for="restaurant in this.displayedRestaurants" class="col p-2">

                    <div class="my_card">
                        <router-link :to="{ name: 'singleRestaurant', params: { slug: restaurant.slug } }"
                            class="text-decoration-none">
                            <img v-if="restaurant.img" class="card-img-top rounded-3 img-fluid border border-black "
                                :src="state.base_url + 'storage/' + restaurant.img" alt="...">
                            <img v-else style="aspect-ratio: 1;" class="card-img-top rounded-3 img-fluid"
                                src="../assets/img/anonimus.jpeg" alt="...">
                            <h6 class="py-2">
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
                            Guarda i nostri ristoranti
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

            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 pb-5">

                <!-- iterate each type -->
                <div v-for="( single_type, index ) in    this.types " :key="single_type.id" class="col">

                    <div class="text-decoration-none m-1 text-center my_card_types" :key="single_type.slug"
                        :class="{ 'active': isChecked('types[]=' + single_type.slug + '&') }">

                        <input v-model="this.state.selectedTypes" class="form-check-input d-none" :for="single_type.id"
                            type="checkbox" :value="'types[]=' + single_type.slug + '&'" :id="single_type.id" />
                        <label class="form-check-label w-100 text-light my_p" :for="single_type.id">
                            {{ single_type.name }}
                        </label>

                    </div>

                </div>

                <button class="my_btn_types my-4" @click="filterRestaurants">
                    Filtra ristoranti
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
    background-repeat: repeat-x;
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
        border: 2px solid black;
    }

}

.my_card_types {
    background-color: black;
    border-radius: 5px;
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

.my_p {
    padding: 1.4rem;
}

.my_btn_types {
    background-color: $d_boo_orange;
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