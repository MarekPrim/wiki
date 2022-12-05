import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            alias: '/landing',
            name: 'landing',
            component: () =>
                import ('./components/landing/LandingPage.vue'),
        },
        {
            path: '/pages',
            name: 'list page',
            component: () =>
                import ('./components/ListPageSuspense.vue'),
        },
        {
            path: '/page/:name',
            name: 'page',
            component: () =>
                import ('./components/Page.vue'),
        },
        {
            path: '/add',
            name: 'add',
            component: () =>
                import ('./components/Add.vue'),
        },
        {
            path: '/edit/:name',
            name: 'edit',
            component: () =>
                import ('./components/Edit.vue'),
        },

    ],
});
export default router;