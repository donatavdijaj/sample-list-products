import { createApp } from 'vue'
import './style.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Store from './routes/Store.vue'
import ProductDetails from './routes/ProductDetails.vue'

const routes = [
    { path: '/:id', component: ProductDetails },
    { path: '/', component: Store },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).use(VueQueryPlugin).mount('#app')
