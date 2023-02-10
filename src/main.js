import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI';
import router from './router/router';
import directives from './directives';
import { createPinia } from 'pinia'
// import pinia from './store';
// console.log(components)
// console.log('directives',directives)

import './assets/main.css';

const app = createApp(App);
const pinia = createPinia()


components.forEach(component => {
    // console.log(component.name, component)
    app.component(component.name, component)
})

directives.forEach(directive => {
    // console.log(directive.name, directive)
    app.directive(directive.name, directive)
})



app .use(pinia)
    .use(router)
    .mount('#app')
