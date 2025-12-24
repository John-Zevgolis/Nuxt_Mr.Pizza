<template>
  <footer v-if="settings && data" class="py-24 px-3 bg-black text-white">
    <div class="flex flex-wrap -mx-3">
      <div class="px-3 w-full sm:w-1/2 lg:w-1/4 mb-12 lg:mb-0">
        <NuxtImg
          :src="logo.url"
          loading="lazy"
          width="164"
          height="195"
          priority
          :alt="logo.alt"
          class="mx-auto"
        />
      </div>
      <div
        v-for="[key, value] in data.contact"
        :key="key"
        class="px-3 w-full sm:w-1/2 lg:w-1/4 text-center mb-12 lg:mb-0"
      >
        <div v-html="value"></div>
        <div v-if="key === 'address'">
          <p>{{ data.address }}</p>
          <div class="flex justify-center">
            <SocialItems :socials="socials" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Footer, GeneralSettings } from '~/types';

const settings = useState<GeneralSettings | null>('app-settings');

const logo = computed(() => settings.value?.logo || { url: '', alt: '' });
const socials = computed(() => settings.value?.socials || []);

const { data } = await useFetch<Footer>('/api/footer');
</script>

<style lang="scss">
footer {
  h2 {
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;

    @media (min-width: 640px) {
      font-size: 1.25rem;
    }

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.25rem;
    }

    @media (min-width: 1536px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1.125rem;

    @media (min-width: 640px) {
      font-size: 1rem;
    }

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }

    @media (min-width: 1024px) {
      font-size: 1rem;
    }

    @media (min-width: 1536px) {
      font-size: 1.125rem;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    span {
      display: block;
    }

    a {
      transition: color 0.3s;

      &:hover {
        color: #d8252f;
      }
    }
  }
}
</style>
