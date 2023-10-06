// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';

// 環境変数からベースURLをセット
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

// #app の起動
createApp(App).use(router).mount('#app');
