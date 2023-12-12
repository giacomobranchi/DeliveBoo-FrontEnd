import { createWebHashHistory, createRouter } from 'vue-router';

import AppHome from './views/AppHome.vue';
import RestaurantsView from './views/RestaurantsView.vue';
import SingleRestaurantView from './views/SingleRestaurantView.vue';
import AllRestaurantsView from './views/AllRestaurantsView.vue';
import CheckoutView from './views/CheckoutView.vue';

const router = createRouter({

    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
        },
        {
            path: '/restaurant/:slug',
            name: 'singleRestaurant',
            component: SingleRestaurantView
        },
        {
            path: '/restaurants/:slug',
            name: 'restaurantsList',
            component: RestaurantsView
        },
        {
            path: '/restaurants',
            name: 'allRestaurantsList',
            component: AllRestaurantsView
        },
        {
           path: '/checkout/:slug',
            name: 'CheckoutView',
            component: CheckoutView,
        },
    ]
});

export { router }
/*                 {
                    path: '/restaurants',
                    name: 'restaurantsList',
                    component: RestaurantsView
                }, */