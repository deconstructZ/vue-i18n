import { createI18n } from "vue-i18n";
import zh from "./zh-CN";
import en from "./en-US";
const i18n = createI18n({
  locale: "zh", // 设置地区
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages: {
    zh,
    en,
  },
});

export default i18n;
