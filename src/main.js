import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n,  } from 'vue-i18n'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import initPrimeComponents from './utils/init-prime-components';
import 'primevue/resources/themes/md-light-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/assets/base.css';
import resources from '@/resources';
import initFirebase from './utils/firebase';

const i18n = createI18n({
  locale: 'en',
  messages: resources
})

const app = createApp(App)

app.use(PrimeVue);
initPrimeComponents(app); // initializing primevue components
initFirebase(); // initializing firebase
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
