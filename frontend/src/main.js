import './config/axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'vue3-toastify/dist/index.css';
import 'cropperjs/dist/cropper.css';

import { createApp } from 'vue'
import App from './App.vue'
import Store from '@/config/store'
import Router from './config/router'

createApp(App)
    .use(Store)
    .use(Router)
    .mount('#app')
