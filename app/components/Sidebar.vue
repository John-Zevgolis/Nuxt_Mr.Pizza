<template>
  <div
    :class="{ 'active-overlay': active }"
    class="overlay fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ease-in-out"
    @click="$emit('close')"
  />
  <div
    :class="{ 'active-sidebar': active }"
    class="sidebar lg:hidden fixed top-0 left-0 z-50 bg-black w-full h-full overflow-auto max-w-[320px] -translate-x-full transition-transform duration-300 ease-in-out px-8 py-12"
  >
    <div class="flex justify-end mb-6">
      <button
        aria-label="$emit('close') menu"
        @click="$emit('close')"
        class="text-white text-3xl cursor-pointer"
      >
        <Icon name="fa6-solid:xmark" />
      </button>
    </div>
    <SocialItems closeOnClick :socials="socials" />
    <nav class="mt-12" aria-label="mobile-menu">
      <ul>
        <li v-for="item in menu" class="mb-4" :key="item.id">
          <NuxtLink
            class="text-white text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold lg:mb-0 lg:mx-4 leading-none hover:text-[#97211a] hover:[text-shadow:1px_1px_#fff] transition-all duration-300"
            :to="item.slug === '' ? '/' : `/${item.slug}`"
            :exact="item.slug === ''"
            active-class="!text-[#97211a] [text-shadow:1px_1px_#fff]"
            exact-active-class="!text-[#97211a] [text-shadow:1px_1px_#fff]"
            @click="$emit('close')"
            >{{ item.title }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem, SocialItem } from '~/types';

defineProps<{
  menu: MenuItem[];
  socials: SocialItem[];
  active: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>

<style scoped lang="scss">
.sidebar {
  scrollbar-color: #97211a #fff;
  scrollbar-width: thin;

  @media (max-width: 419.98px) {
    max-width: none;
  }

  &.active-sidebar {
    transform: none;
  }
}

.overlay {
  opacity: 0;
  visibility: hidden;

  &.active-overlay {
    opacity: 1;
    visibility: visible;
  }
}
</style>
