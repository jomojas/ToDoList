import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { createPinia } from 'pinia';

const pinia = createPinia();

// createApp(App).mount('#app')
// createApp(App).use(router).mount('#app');
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');