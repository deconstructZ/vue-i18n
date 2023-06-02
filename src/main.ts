import { createApp } from "vue";
import "./style.css";
import vueI18n from "./language";
import App from "./App.vue";

createApp(App).use(vueI18n).mount("#app");
