import { createApp } from "vue";
import App from "./app.vue";
import vitepressdemo from "@vite-press-demo/components";
const app = createApp(App);

app.use(vitepressdemo);
app.mount("#app");
