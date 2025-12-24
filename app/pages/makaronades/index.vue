<template>
  <Loader v-if="pending && !data" />
  <main v-if="data" class="custom-padding-top pb-16 px-3">
    <h1
      class="font-bold text-center 2xl:mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-[#97211a]"
    >
      {{ title }}
    </h1>
    <div class="flex flex-wrap -mx-3">
      <div
        v-for="item in makaronades"
        :key="item.id"
        class="w-full sm:w-1/2 lg:w-1/3 px-3 mt-6"
      >
        <Item :slug="url" :item="item" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Item } from '~/types';

const { data, pending } = await useAsyncData('makaronades-data', async () => {
  const [titleData, itemsData] = await Promise.all([
    $fetch<{ title: string; url: string }>('/api/title', {
      query: { type: 'makaronades' },
    }),
    $fetch<Item[]>('/api/items', {
      query: { type: 'makaronades-items' },
    }),
  ]);

  return {
    title: titleData.title,
    url: titleData.url,
    makaronades: itemsData,
  };
});

const makaronades = computed(() => data.value?.makaronades || []);
const title = computed(() => data.value?.title || '');
const url = computed(() => data.value?.url || '');

definePageMeta({
  layout: 'with-footer',
});

useSeoMeta({
  title: () => `Mr.Pizza | ${title.value}`,
});
</script>
