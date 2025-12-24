<template>
  <Loader v-if="pending && !data" />
  <main
    v-if="data"
    class="custom-padding-top pb-16 px-3 w-full sm:max-w-none lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto"
  >
    <h1
      class="font-bold text-center mb-6 2xl:mb-12 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-[#97211a]"
    >
      {{ data.title }}
    </h1>
    <div
      class="menu py-6 md:py-12 px-4 sm:px-6 md:px-12 rounded-sm bg-[#97211a] text-white"
      v-html="data.content"
    ></div>
  </main>
</template>

<script setup lang="ts">
const { data, pending } = await useFetch<{ title: string; content: string }>(
  '/api/content',
  {
    query: {
      type: 'timokatalogos',
    },
  }
);

definePageMeta({
  layout: 'with-footer',
});

useSeoMeta({
  title: () => `Mr.Pizza | ${data.value?.title}`,
});
</script>
