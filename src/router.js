import { createWebHashHistory, createRouter } from 'vue-router';

import AppHome from './views/AppHome.vue';
import RestaurantsView from './views/RestaurantsView.vue';
import SingleRestaurantView from './views/SingleRestaurantView.vue';
import AllRestaurantsView from './views/AllRestaurantsView.vue';
import CheckoutView from './views/CheckoutView.vue';
import FAQView from './views/FAQView.vue';
import PaymentView from './views/PaymentView.vue';
import TerminiPrivacyCookiesView from './views/TerminiPrivacyCookiesView.vue';


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
            path: '/all-restaurants/:slug*',
            name: 'allRestaurantsList',
            component: AllRestaurantsView
        },
        {
            path: '/checkout/:slug',
            name: 'CheckoutView',
            component: CheckoutView,
        },
        {

            path: '/FAQ',
            name: 'FAQView',
            component: FAQView,
        },
        {
            path: '/payment',
            name: 'PaymentView',
            component: PaymentView,
        },
        {

            path: '/TerminiPrivacyCookies',
            name: 'TerminiPrivacyCookiesView',
            component: TerminiPrivacyCookiesView,
        },
    ]
});

export { router }
/*                 {
                    path: '/restaurants',
                    name: 'restaurantsList',
                    component: RestaurantsView
                }, */