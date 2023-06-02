## 在 vue3 中使用需要下载最新的 vue-18n 9.x

官网[https://vue-i18n.intlify.dev/guide/introduction.html](https://vue-i18n.intlify.dev/guide/introduction.html)

## 下载

```
pnpm install vue-i18n@9
```

## 创建 i18n 文件夹

- index.ts（入口文件）

```typescript
import { createI18n } from "vue-i18n";
//此处飘红配置了一下tsConfig.json,
//添加了两个选项"noImplicitAny": false,
//							"allowJs": true
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
```

- zh-CN.ts（中文翻译）

```typescript
export default {
  message: {
    hello: "你好",
  },
};
```

- en-US.ts（英文翻译）

```typescript
export default {
  message: {
    hello: "hello",
  },
};
```

- 在 main.ts 中引入

```typescript
import { createApp } from "vue";
import "./style.css";
import vueI18n from "./language";
import App from "./App.vue";

createApp(App).use(vueI18n).mount("#app");
```

## 使用

```vue
<script setup lang="ts"></script>
<template>
  <div>{{ $t("message.hello") }}</div>
</template>
```

控制台警告

```
You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
```

vite.config.ts 添加配置

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  // ...
});
```

_使用 fallbackLocale：'<lang>'选择首选语言缺少翻译时要使用的语言。_<br />如果您想在某个项目在您所需的语言环境中不可用时使用（比如说）en 项目，请 fallbackLocale 在以下选项中设置该选项

```typescript
const i18n = createI18n({
  locale: "ja",
  fallbackLocale: "en",
  messages,
});
```

默认情况下，回退到 fallbackLocale 生成两个控制台警告：

```
[intlify] Not found 'hello' key in 'ja' locale messages.
[intlify] Fall back to translate 'hello' key with 'en' locale.
```

第一条警告消息是打印键，由于给定的翻译功能$t 不在 ja 语言环境消息中，第二条警告消息是当您回退以从语言环境消息中解析本地化消息时出现的 en。输出这些警告消息以支持使用 Vue I18n 进行调试。<br />默认情况下，这些警告消息仅在开发模式 ( ) 中发出警告，不适用于生产。**process.env.NODE_ENV !== 'production'**<br />要抑制第一个 warning( Not found key...)，请 silentTranslationWarn: true 在 Legacy API 模式下设置或 missingWarn: false 在初始化 createI18n.<br />要抑制第二个警告 ( Fall back to...)，请 silentFallbackWarn: true 在 Legacy API 模式下设置或 fallbackWarn: false 在初始化 createI18n.

## 切换语言时如何刷新？

vue-i18n 提供了一个钩子函数 useI18n(),暴露出 locale 属性用于切换语言

```vue
import { useI18n } from 'vue-i18n' const { locale } = useI18n() locale.value =
'en' // 要切换的语言
```

## 切换语言

```vue
<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

function zh() {
  locale.value = "zh"; // 要切换的语言
}

function en() {
  locale.value = "en"; // 要切换的语言
}
</script>
<template>
  <div>{{ $t("message.hello") }}</div>
  <button @click="zh">zh</button>
  <button @click="en">en</button>
</template>
```

## 在 sfc 中使用 i18n 自定义块

需要下载插件@intlify/unplugin-vue-i18n

```
pnpm i --save-dev @intlify/unplugin-vue-i18n
```

并且添加 vite.config.ts 中的配置:

```typescript
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

export default defineConfig({
  plugins: [
    VueI18nPlugin({
      /* options */
    }),
  ],
});
```

使用:<br />参考:[https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n)

```vue
<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: "local",
});
</script>

<template>
  <form>
    <label>{{ t("language") }}</label>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="ch">ch</option>
    </select>
  </form>
  <p>{{ t("hello") }}</p>
</template>

<i18n>
  //消息格式默认使用json格式
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "ch": {
    "language": "语言",
    "hello": "你好！"
  }
}
</i18n>
```

可以嵌套:

```typescript
{
  "en": {
    "msg":{
    "language": "Language",
    "hello": "hello, world!"
    }

  },
  "zh": {
    "msg":{
    "language": "语言",
    "hello": "你好！"
    }

  }
}
```
