<template>
  <ClientOnly>
    <HomepageCarousel v-if="data" :banners="data" />
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Banner } from '~/types';

const { data } = await useFetch<Banner[]>('/api/banners');
</script>
