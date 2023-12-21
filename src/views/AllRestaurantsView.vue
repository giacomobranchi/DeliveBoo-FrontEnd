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
        <div class="row row-cols-1 row-cols-lg-2 py-5">

            <!-- SIDEBAR -->
            <div class="col col-lg-3">
                <h3 class="text-uppercase">Filtra per tipologia</h3>
                <div class="type_list overflow_hidden">
                    <div class="form-check row row-cols-2 row-cols-lg-1 d-flex">
                        <div class="text-decoration-none m-0 col" v-for="(singleType, index) in this.state.types"
                            :key="singleType.slug">

                            <input v-model="state.selectedTypes" class="form-check-input" :for="singleType.id"
                                type="checkbox" :value="'types[]=' + singleType.slug + '&'" :id="singleType.id" />
                            <label class="form-check-label" :for="singleType.id"> {{ singleType.name }} </label>

                        </div>


                    </div>
                </div>
                <div class="d-flex justify-content-start">
                    <button @click="filterRestaurants" class="btn my_btn mt-2 me-3">Filtra</button>
                    <div @click="removeFilter">
                        <RouterLink to="/all-restaurants" class="btn my_btn_clear mt-2 mb-3">Svuota</RouterLink>
                    </div>
                </div>
            </div>
            <!-- /.col -->

            <div class="col col-lg-9">


                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">

                    <div v-for="restaurant in  this.showedRest " class="col">

                        <router-link :to="{ name: 'singleRestaurant', params: { slug: restaurant.slug } }"
                            class="text-decoration-none">
                            <div class="card bg-black overlay bg-transparent border-0">

                                <img v-if="restaurant.img" class="card-img-top rounded-3 img-fluid"
                                    :src="state.base_url + 'storage/' + restaurant.img" alt="...">
                                <img v-else style="aspect-ratio: 1;" class="card-img-top rounded-3 img-fluid"
                                    src="../assets/img/anonimus.jpeg" alt="...">
                                <div class="card-body shadow py-3 overflow_hidden rounded-3">
                                    <div class="row">
                                        <div class="col" v-for=" singleType  in  restaurant.types ">
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
    margin: auto 0;
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