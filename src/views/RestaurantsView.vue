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
        this.state.fetchTypes()
    }
}
</script>

<template>
    <main>

        <div class="container">
            <div class="row py-5">
                <div class="col-3 bg-danger">
                    <h3>Filtra per tipologia</h3>
                    <div v-for="type in this.state.types">
                        <router-link :to="{ name: 'type', params: { slug: type.slug } }"
                            class="border border-secondary rounded-3 p-2 m-1">
                            {{ type.name }}
                        </router-link>
                    </div>
                </div>
                <!-- /.col -->

                <div class="col-9 row row-cols-3 bg-warning">

                    <div v-for="restaurant in this.state.restaurants" class="col-4 py-1  px-3">
                        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
                            class="card bg-transparent border-0 text-decoration-none">
                            <img src="https://imgs.search.brave.com/Q37xS1P9QR74fgVCUo7CA6Zpn_woGWjzvP9x8e4nUCk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cmlzdG9yYW50ZXJv/Y2NhLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvZWxlbWVudG9y/L3RodW1icy9yZXN0/YXVyYW50X2Rvd25z/dGFpcnNfcm9vbS1v/ODYxdmd6cjQ0emlh/M25tMm5zdzlpd2N3/MDc2MW83YXlyeTcz/bXFobXMuanBn"
                                class="img-fluid" alt="...">
                            <div class="card-body p-0">
                                <h5 class="card-title m-0"><strong>
                                        {{ restaurant.name }}
                                    </strong></h5>
                                <div class="row">
                                    <div class="col text-center" v-for="type in restaurant.types">
                                        <div class="badge bg-danger">
                                            {{ type.name }}
                                        </div>
                                    </div>
                                </div>
                                <!-- /.row -->
                            </div>
                        </router-link>
                        <!-- /.card -->

                    </div>
                </div>
                <!-- /.col -->

            </div>
            <!-- /.row -->
        </div>
        <!-- /.container -->
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

main {
    background-color: $d_boo_primary;
}
</style>