<script>
import { state } from '../state.js';
import axios from 'axios';

export default {
    name: 'TypeRestaurantsView',
    components: {},
    data() {
        return {
            state,
            typeRestaurants: null,
            typeRestaurants: { users: [] },

        }
    },


    mounted() {

        axios.get(this.state.base_url + `api/types/${this.$route.params.slug}`)
            .then(response => {
                this.typeRestaurants = response.data.result;
                //console.log(this.typeRestaurants);
            }).catch(err => {
                console.error(err);
            })

        this.state.fetchTypes()
    }
}
</script>

<template>
    <main>
        <section>

            <div class="container text-white">
                <div class="row py-5">
                    <div class="col-3">
                        <h3 class="text-uppercase">Filtra per tipologia</h3>
                        <div class="type_list overflow_hidden">
                            <div class="text-decoration-none m-1" v-for="type in this.state.types">
                                <router-link :to="{ name: 'singleType', params: { slug: type.slug } }"
                                    class="text-decoration-none btn">
                                    {{ type.name }}
                                </router-link>
                            </div>
                        </div>    
                    </div>
                    <!-- /.col -->

                    <div v-if="typeRestaurants" class="col-9 row row-cols-3 g-4">

                        <div v-for="restaurant in typeRestaurants.users" class="col-4">
                            <router-link :to="{ name: 'singleRestaurant', params: { slug: restaurant.slug } }" class="text-decoration-none">
                                <div class="card bg-transparent border-0">
                                    <img class="card-img-top rounded-3 img-fluid" src="https://imgs.search.brave.com/Q37xS1P9QR74fgVCUo7CA6Zpn_woGWjzvP9x8e4nUCk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cmlzdG9yYW50ZXJv/Y2NhLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvZWxlbWVudG9y/L3RodW1icy9yZXN0/YXVyYW50X2Rvd25z/dGFpcnNfcm9vbS1v/ODYxdmd6cjQ0emlh/M25tMm5zdzlpd2N3/MDc2MW83YXlyeTcz/bXFobXMuanBn" alt="...">
                                    <div class="card-body px-0 py-3">
                                    <h5 class="card-title m-0 text-white fw-bold">
                                        {{ restaurant.name }}
                                    </h5>
                                    <div class="row">
                                            <div class="col text-center" v-for="type in restaurant.types">
                                                <div class="badge bg-danger">
                                                    {{ type.name }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.row -->
                                    </div>
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

        </section>
        
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

main {
    background-image: url(https://w0.peakpx.com/wallpaper/1019/191/HD-wallpaper-restaurant-and-bar-with-gorgeous-view-city-restaurant-view-bar.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.type_list{
    max-height: 600px;
    overflow-y: scroll;
}
.overflow_hidden {
    overflow-y: scroll;
}
.overflow_hidden::-webkit-scrollbar {
    display: none;

}
.btn{
    color: white;
    font-size: 24px;
}
.btn:hover{
    color: greenyellow;
}
</style>