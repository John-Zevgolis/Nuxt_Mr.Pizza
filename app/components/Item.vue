<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :visible="{
      opacity: 1,
      y: 0,
      transition: { duration: 300 },
    }"
  >
    <NuxtLink
      :to="`/${slug}/${item.slug}`"
      :class="{ animate: item.hasOverlay === 'YES' }"
      class="box relative overflow-hidden block"
    >
      <NuxtImg
        :src="item.thumbnail"
        :alt="item.hasOverlay === 'YES' ? '' : item.title"
        loading="lazy"
        class="absolute w-full h-full inset-0 object-cover transition-transform duration-300 ease-out"
      />
      <div
        v-if="item.hasOverlay === 'YES'"
        class="absolute text-center flex justify-center items-center inset-0 bg-black/40"
      >
        <span
          v-html="item.title"
          class="[text-shadow:2px_2px_#000] block text-white text-2xl sm:text-xl md:text-2xl lg:text-xl xl:text-2xl font-bold"
        ></span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '~/types';

defineProps<{
  item: Item;
  slug: string;
}>();
</script>

<style lang="scss" scoped>
.box {
  padding-top: 71.83333%;
}

.animate {
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
}
</style>
