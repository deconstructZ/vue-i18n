import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueI18nPlugin({})],
  // define: {
  //   __VUE_I18N_FULL_INSTALL__: true,
  //   __VUE_I18N_LEGACY_API__: false,
  //   __INTLIFY_PROD_DEVTOOLS__: false,
  // },
});
