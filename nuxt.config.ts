// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-swiper',
    '@vueuse/motion/nuxt',
  ],
  runtimeConfig: {
    cosmicBucketSlug: process.env.BUCKET_SLUG,
    cosmicReadKey: process.env.READ_KEY,
  },
  app: {
    head: {
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-EK0DZN5DYK',
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EK0DZN5DYK');
          `,
          type: 'text/javascript',
        },
      ],
    },
  },
});
