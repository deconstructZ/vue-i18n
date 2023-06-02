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
      <option value="zh">zh</option>
    </select>
  </form>
  <p>{{ t("hello") }}</p>
</template>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "zh": {
    "language": "语言",
    "hello": "你好！"
  }
}
</i18n>
