<template>
  <header
    v-if="settings && menu"
    class="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] z-30 pt-4"
  >
    <nav aria-label="main menu" class="h-20 bg-black relative flex px-3">
      <div
        class="left-col flex justify-between items-center h-full xl:pr-4 2xl:pr-6"
      >
        <div class="hidden sm:block">
          <SocialItems :socials="socials" />
        </div>
        <nav aria-label="desktop-menu" class="hidden lg:block">
          <ul class="flex items-center justify-end h-full">
            <li v-for="item in menu?.slice(0, 3)" :key="item.id">
              <NuxtLink
                class="text-white text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold lg:mb-0 lg:mx-4 leading-none hover:text-[#97211a] hover:[text-shadow:1px_1px_#fff] transition-all duration-300"
                :to="item.slug === '' ? '/' : `/${item.slug}`"
                :exact="item.slug === ''"
                active-class="!text-[#97211a] [text-shadow:1px_1px_#fff]"
                exact-active-class="!text-[#97211a] [text-shadow:1px_1px_#fff]"
                @click="closeMobileMenu"
                >{{ item.title }}</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
      <NuxtLink
        to="/"
        class="logo size-40 sm:size-44 md:size-48 lg:size-40 xl:size-44 2xl:size-48 bg-[#be834e] p-3 inline-block -top-2 shadow-[1px_1px_5px_#000] absolute left-2/4 -translate-x-1/2"
      >
        <div
          class="h-full p-1 flex justify-center items-center border-3 border-black"
        >
          <div>
            <span
              class="block text-center text-2xl md:text-3xl lg:text-2xl 2xl:text-3xl mb-1 font-bold text-[#97211a] leading-none [text-shadow:2px_2px_#000] tracking-[-2px] [word-spacing:-2px]"
            >
              Mr. Pizza
            </span>
            <NuxtImg
              :src="logo.url"
              width="90"
              height="107"
              :alt="logo.alt"
              class="mx-auto"
            />
          </div>
        </div>
      </NuxtLink>
      <div
        class="right-col flex justify-end lg:justify-start items-center h-full ml-auto xl:pl-4 2xl:pl-6"
      >
        <div class="lg:hidden">
          <button
            @click="openMobileMenu"
            aria-label="open menu"
            class="cursor-pointer text-3xl text-white"
          >
            <Icon name="fa6-solid:bars" class="text-white" />
          </button>
        </div>
        <nav aria-label="desktop-menu" class="hidden lg:block">
          <ul class="flex items-center h-full">
            <li v-for="item in menu?.slice(3, 6)" :key="item.id">
              <NuxtLink
                class="text-white text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold lg:mb-0 lg:mx-4 leading-none hover:text-[#97211a] hover:[text-shadow:1px_1px_#fff] transition-all duration-300"
                :to="item.slug === '' ? '/' : `/${item.slug}`"
                :exact="item.slug === ''"
                active-class="!text-[#97211a] [text-shadow:1px_1px_#fff]"
                exact-active-class="!text-[#97211a] [text-shadow:1px_1px_#fff]"
                @click="closeMobileMenu"
                >{{ item.title }}</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  </header>
  <ClientOnly>
    <Sidebar
      @close="closeMobileMenu"
      v-show="menu && settings"
      :menu="menu || []"
      :socials="socials"
      :active="showMobileMenu"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import type { GeneralSettings, MenuItem } from '~/types';

const settings = useState<GeneralSettings | null>('app-settings');

const logo = computed(() => settings.value?.logo || { url: '', alt: '' });
const socials = computed(() => settings.value?.socials || []);

const { data: menu } = await useFetch<MenuItem[]>('/api/menu');

const showMobileMenu = ref(false);

const openMobileMenu = () => (showMobileMenu.value = true);

const closeMobileMenu = () => (showMobileMenu.value = false);

provide('close', closeMobileMenu);

const { width } = useWindowSize();

watch(width, (newWidth) => {
  if (newWidth >= 1024) {
    showMobileMenu.value = false;
  }
});
</script>

<style lang="scss" scoped>
.left-col,
.right-col {
  @media (min-width: 1024px) {
    width: calc(50% - (160px / 2));
  }

  @media (min-width: 1280px) {
    width: calc(50% - (176px / 2));
  }

  @media (min-width: 1536px) {
    width: calc(50% - (200px / 2));
  }
}

.logo {
  img {
    max-width: 76px;

    @media (min-width: 640px) {
      max-width: 82px;
    }

    @media (min-width: 768px) {
      max-width: none;
    }

    @media (min-width: 1024px) {
      max-width: 76px;
    }

    @media (min-width: 1280px) {
      max-width: 82px;
    }

    @media (min-width: 1536px) {
      max-width: none;
    }
  }

  &:before,
  &:after {
    content: ' ';
    position: absolute;
    background: none;
    border: 4px solid;
    display: block;
    width: 8px;
    height: 8px;
    top: 0;
    filter: brightness(66%);
  }

  &:before {
    left: -8px;
    border-color: transparent #be834e #be834e transparent;
  }

  &:after {
    right: -8px;
    border-color: transparent transparent #be834e #be834e;
  }
}
</style>
