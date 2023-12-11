import { createWebHashHistory, createRouter } from 'vue-router';


import RestaurantsView from './views/RestaurantsView.vue';
import SingleRestaurantView from './views/SingleRestaurantView.vue';
import TypeRestaurantsView from './views/TypeRestaurantsView.vue';
import CheckoutView from './views/CheckoutView.vue';

const router = createRouter({

    history: createWebHashHistory(),

    routes: [
        {
            path: '/restaurants',
            name: 'restaurantsList',
            component: RestaurantsView
        },
        {
            path: '/restaurant/:slug',
            name: 'singleRestaurant',
            component: SingleRestaurantView
        },
        {
            path: '/type/:slug',
            name: 'singleType',
            component: TypeRestaurantsView
        },
        {
            path: '/checkout',
            name: 'CheckoutView',
            component: CheckoutView,
           
        },
    ]
});

export { router }