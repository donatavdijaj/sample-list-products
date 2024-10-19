import { createApp } from 'vue'
import './style.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Store from './routes/Store.vue'

const routes = [{ path: '/', component: Store }]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).use(VueQueryPlugin).mount('#app')
