<script>
import { RouterLink } from 'vue-router';
import { state } from '../state.js';
import axios from 'axios';
export default {
    name: 'AllRestaurantsView',
    components: { RouterLink },
    data() {
        return {
            state,
            showedRest: null,
            restaurants: []

        }
    },

    methods: {
        async fetchRestaurants() {
            const fetchedRestaurants = await axios.get(this.state.base_url + 'api/restaurants/')
                .then(response => {
                    this.restaurants = response.data.result;
                    if (!this.$route.params.slug) {
                        this.showedRest = this.restaurants
                    }

                }).catch(err => {
                    console.error(err);
                })
            return fetchedRestaurants
        },

        async filterRestaurants() {
            // Filtra i ristoranti in base alle tipologie selezionate
            this.state.selectedTypeParams = this.state.selectedTypes.join('');
            console.log('topperia');
            await axios.get(this.state.base_url + `api/restaurants/filter?${this.state.selectedTypeParams}`)
                .then(response => {
                    this.showedRest = response.data;
                    console.log(response.data);
                    console.log(this.state.base_url + `api/restaurants/filter?${this.selectedTypeParams}`);
                })
                .catch(err => {
                    console.error(err);
                });

        },
        removeFilter() {

            this.showedRest = this.restaurants
            this.state.selectedTypes = []
        },

        filterHome() {
            axios
                .get(this.state.base_url + `api/restaurants/filter?${this.$route.params.slug}`)
                .then(response => {
                    this.showedRest = response.data
                    console.log(this.showedRest);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    },


    async mounted() {



    },
    created() {
        this.fetchRestaurants()
        this.state.fetchTypes()
        this.filterHome()

    }

}
</script>

<template>
    <div class="container text-white">
        <div class="row py-5">

            <!-- SIDEBAR -->
            <div class="col-3">
                <h3 class="text-uppercase">Filtra per tipologia</h3>
                <div class="type_list overflow_hidden">
                    <div class="form-check">
                        <div class="text-decoration-none m-1" v-for="(singleType, index) in this.state.types"
                            :key="singleType.slug">

                            <input v-model="state.selectedTypes" class="form-check-input" :for="singleType.id"
                                type="checkbox" :value="'types[]=' + singleType.slug + '&'" :id="singleType.id" />
                            <label class="form-check-label" :for="singleType.id"> {{ singleType.name }} </label>

                        </div>


                    </div>
                </div>

                <button @click="filterRestaurants" class="btn my_btn mt-2 me-3">Filtra</button>
                <div @click="removeFilter">
                    <RouterLink to="/all-restaurants" class="btn my_btn_clear mt-2">Svuota</RouterLink>
                </div>

            </div>
            <!-- /.col -->

            <div class="col-9">


                <div class="row row-cols-3 g-4">

                    <div v-for="restaurant in this.showedRest" class="col-4">

                        <router-link :to="{ name: 'singleRestaurant', params: { slug: restaurant.slug } }"
                            class="text-decoration-none">
                            <div class="card bg-black overlay bg-transparent border-0">
                                <img class="card-img-top rounded-3 img-fluid"
                                    src="https://imgs.search.brave.com/Q37xS1P9QR74fgVCUo7CA6Zpn_woGWjzvP9x8e4nUCk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cmlzdG9yYW50ZXJv/Y2NhLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvZWxlbWVudG9y/L3RodW1icy9yZXN0/YXVyYW50X2Rvd25z/dGFpcnNfcm9vbS1v/ODYxdmd6cjQ0emlh/M25tMm5zdzlpd2N3/MDc2MW83YXlyeTcz/bXFobXMuanBn"
                                    alt="...">

                                <div class="card-body shadow py-3 overflow_hidden rounded-3">
                                    <div class="row">
                                        <div class="col" v-for="singleType in restaurant.types">
                                            <div class="badge bg-danger">
                                                {{ singleType.name }}
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.row -->
                                </div>
                                <!-- /.card -->
                            </div>
                            <div class="card-title">
                                <h5 class="card-title m-0 text-white text-center pt-2 fw-bold">
                                    {{ restaurant.name }}
                                </h5>
                            </div>
                        </router-link>

                    </div>

                </div>



            </div>
            <!-- /.col -->

        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.type_list {
    max-height: 600px;
    overflow-y: scroll;
}

.overflow_hidden {
    overflow-y: scroll;
}

.overflow_hidden::-webkit-scrollbar {
    display: none;

}

.my_btn {
    background-color: $d_boo_orange;
    margin: auto;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    color: black;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid black;
    }

}

.my_btn_clear {
    background-color: black;
    margin: auto;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    color: $d_boo_orange;
    font-weight: 600;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid $d_boo_orange;
    }

}

img {
    object-fit: cover;
}

img:hover .overlay {
    display: block;
}

.overlay {
    position: relative;
}

.overlay:hover .shadow {
    display: block;
}

.shadow {
    padding: 1rem;
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.500);
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
</style>