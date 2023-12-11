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
    <main>
        <section>

            <div class="container">
                <div v-if="singleRestaurant" class="row">
                    <div class="col-3">
                        <h1>{{ singleRestaurant.name }}</h1>
                        <div>{{ singleRestaurant.address }}</div>
                    </div>
                    <!-- /.col -->
                    <div class="col-12 col-md-9 row row-cols-1  row-cols-md-2 ">
                        <div v-for="dish in singleRestaurant.dish" class="col col-md-6 py-1  p-3">
                            <div class="card bg-transparent border-0 text-decoration-none">
                                <img :src="base_url + 'storage/' + dish.img" class="img-fluid" alt="">

                                <div class="card-body p-0">
                                    <h5 class="card-title m-0"><strong>
                                            {{ dish.name }}
                                        </strong></h5>
                                    <div class="row">
                                        <div class="col text-center">
                                            <div class="badge bg-danger">
                                                {{ dish.price }}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.row -->
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
        <!-- /.container -->
        
        </section>
        

    </main>
</template>

<style lang="scss">
@use '../assets/scss/partials/variables' as *;

main {
    background-image: url(https://w0.peakpx.com/wallpaper/1019/191/HD-wallpaper-restaurant-and-bar-with-gorgeous-view-city-restaurant-view-bar.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
section{
    background-color: rgba(0, 0, 0, 0.500);
}
</style>