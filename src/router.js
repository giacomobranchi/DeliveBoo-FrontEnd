import { createWebHashHistory, createRouter } from 'vue-router';


import RestaurantsView from './views/RestaurantsView.vue';
import SingleRestaurantView from './views/SingleRestaurantView.vue';

const router = createRouter({

    history: createWebHashHistory(),

    routes: [
        {
            path: '/restaurants',
            name: 'restaurants',
            component: RestaurantsView
        },
        {
            path: '/restaurant/:slug',
            name: 'restaurant',
            component: SingleRestaurantView
        },
    ]
});

export { router }