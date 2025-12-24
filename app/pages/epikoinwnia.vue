<template>
  <Loader v-if="pending && !data" />
  <main v-if="data" class="custom-padding-top">
    <h1
      class="font-bold text-center mb-6 2xl: mb-12 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-[#97211a]"
    >
      {{ data.title }}
    </h1>
    <Map />
  </main>
</template>

<script setup lang="ts">
const { data, pending } = await useFetch<{ title: string; url: string }>(
  '/api/title',
  {
    query: {
      type: 'epikoinwnia',
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
