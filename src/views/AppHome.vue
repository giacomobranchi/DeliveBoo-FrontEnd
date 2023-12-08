<script>
import axios from 'axios';

export default {
    name: 'AppHome',

    data() {
        return {
            restaurants_api: 'http://127.0.0.1:8000/api/restaurants',
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

        <h2 class="mb-5">
            Look at our restaurants selection!
        </h2>

        <div class="row g-5 pb-5">
            <div v-for="restaurant in this.restaurants" class="col-3">

                <div class="my_card card">
                    <h6 class="text-light text-end">
                        {{ restaurant.name }}
                    </h6>

                </div>

            </div>
        </div>

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
    padding: 1rem;
}
</style>