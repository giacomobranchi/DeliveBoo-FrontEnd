<script>
import axios from 'axios';

export default {
    name: 'AppHome',

    data() {
        return {
            restaurants_api: 'http://127.0.0.1:8000/api/restaurants',
            types_api: 'http://127.0.0.1:8000/api/types',
            restaurants: [],
            displayedRestaurants: [],
            types: [],
            displayedTypes: [],
            items: 8,
            loading: true,
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
                this.displayedTypes = this.types.slice(0, this.items);
                console.log(this.types);
            })

    },

    methods: {

        reload() {
            window.location.reload()
        },


        loadMore() {
            let start = this.displayedTypes.length
            let end = start + this.items
            this.displayedTypes = this.displayedTypes.concat(this.types.slice(start, end))
            console.log(this.displayedTypes);
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
                    <span @click="reload">
                        <router-link to="/restaurants" class="text-decoration-none">
                            <h6>
                                Look at all our restaurants!
                            </h6>
                        </router-link>
                    </span>
                </button>

            </div>
        </section>

        <!-- types section -->
        <section id="types" class="pb-5">

            <h2 class="mb-5">
                What do you like to eat?
            </h2>

            <!-- types cards -->
            <div class="row g-1 pb-5">

                <div v-for="( single_type, index ) in  this.displayedTypes " :key="single_type.id" class="col-3">

                    <div class="my_card_types">

                        <router-link :to="{ name: 'restaurantsList', params: { slug: single_type.slug } }"
                            class="text-decoration-none">
                            <h6>
                                {{ single_type.name }}
                            </h6>
                        </router-link>

                    </div>

                </div>

                <!-- load more types -->
                <button class="my_btn_types my-4 text-dark" @click="loadMore" v-if="this.displayedTypes < this.types">
                    <h6 class="text-black">
                        Show more
                    </h6>
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
        transform: scale(1.20);
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
        transform: scale(1.20);
        border: 1px solid $d_boo_orange;
        cursor: pointer;
        box-shadow: inset 0px 0px 5px 0px $d_boo_orange;
    }

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