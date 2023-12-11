<script>
import axios from 'axios';

export default {
    name: 'AppHome',

    data() {
        return {
            restaurants_api: 'http://127.0.0.1:8000/api/restaurants',
            types_api: 'http://127.0.0.1:8000/api/types',
            restaurants: [],
            types: [],
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

                console.log(this.restaurants);
            })

        axios
            .get(this.types_api)
            .then(response => {
                this.types = response.data.result

                console.log(this.types);
            })
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

        <section id="restaurants">
            <h2 class="mb-5">
                Look at our restaurants selection!
            </h2>

            <div class="row g-1 pb-5">
                <div v-for="restaurant in this.restaurants" class="col-3">

                    <div class="my_card">
                        <h6 class="text-light">
                            {{ restaurant.name }}
                        </h6>

                    </div>

                </div>
            </div>
        </section>

        <section id="types">

            <h2 class="mb-5">
                What do you like to eat?
            </h2>

            <div class="row g-1 pb-5">
                <div v-for="single_type in this.types" class="col-3">

                    <div class="my_card_types">
                        <h6 class="text-light">
                            {{ single_type.name }}
                        </h6>

                    </div>

                </div>
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

.my_card {
    background-color: $d_boo_orange;
    border-radius: 5px;
    padding: 1.4rem;
    transition: .3s ease-in-out;
    border: 1px solid transparent;

    &:hover {
        transform: scale(1.15);
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

    &:hover {
        transform: scale(1.15);
        border: 1px solid white;
        cursor: pointer;
        box-shadow: inset 0px 0px 5px 0px white;
    }

}
</style>