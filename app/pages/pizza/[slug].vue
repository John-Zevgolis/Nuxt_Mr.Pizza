<template>
  <Loader v-if="pending && !item" />
  <InnerItem v-if="item" :item="item" />
</template>

<script setup lang="ts">
import type { InnerItemType } from '~/types';

const { slug } = useRoute().params;

const {
  data: item,
  pending,
  error,
} = await useFetch<InnerItemType>('/api/item', {
  query: {
    slug,
    key: `inner-item-${slug}`,
  },
});

if (error.value) {
  throw createError({
    statusCode: 404,
    fatal: true,
  });
}

useSeoMeta({
  title: () => `Mr.Pizza | ${item.value?.title}`,
});
</script>
