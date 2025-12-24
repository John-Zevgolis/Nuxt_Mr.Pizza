<template>
  <main class="wrapper">
    <Swiper
      :modules="[Autoplay, Navigation, Pagination, EffectFade]"
      :loop="banners.length > 1"
      :navigation="true"
      :pagination="{ clickable: true }"
      :effect="'fade'"
      :autoplay="{
        delay: 6000,
        disableOnInteraction: false,
      }"
    >
      <SwiperSlide v-for="item in banners" :key="item.id">
        <div
          class="min-h-screen h-full flex justify-center items-center relative text-center"
        >
          <NuxtImg
            :alt="item.title"
            class="absolute -z-10 inset-0 object-cover w-full h-full"
            :src="item.image"
          />
          <div class="custom-padding-top custom-padding-bottom relative">
            <NuxtImg
              v-if="item.thumbnail"
              :src="item.thumbnail"
              loading="lazy"
              width="344"
              height="341"
              class="tada max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-72 xl:max-w-80 2xl:max-w-none"
              alt="Offer"
            />
            <template v-else>
              <h1
                class="animate-heading mb-6 text-white font-medium text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
              >
                {{ item.title }}
              </h1>
              <NuxtLink
                class="animate-btn custom-btn overflow-hidden text-white hover:text-[#97211a] rounded-sm px-8 sm:px-12 py-3 sm:py-4 font-bold relative inline-block bg-[#97211a] xl:text-lg"
                :to="`/${item.url}`"
              >
                <span class="z-10 relative">ΠΕΡΙΣΣΟΤΕΡΑ</span>
              </NuxtLink>
            </template>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </main>
</template>

<script setup lang="ts">
import type { Banner } from '~/types';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

defineProps<{
  banners: Banner[];
}>();
</script>

<style lang="scss">
.wrapper {
  .swiper-slide {
    height: auto;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }

    .animate-heading,
    .animate-btn {
      opacity: 0;
    }

    .animate-heading {
      transform: translateY(20px);
    }

    .animate-btn {
      transform: translateY(40px);
    }
  }

  .swiper-slide-active {
    .animate-heading {
      animation: heading 0.3s forwards 0.3s;
    }

    .animate-btn {
      animation: button 0.6s forwards 0.3s;
    }
  }

  .swiper-pagination {
    bottom: 15px;
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
      bottom: 40px;
    }
  }

  .swiper-pagination-bullet {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background: transparent;
    opacity: 1;

    &:after {
      content: '';
      background: #fff;
      border-radius: 100%;
      width: 6px;
      height: 6px;
      display: block;
      margin-top: -1px;
      margin-left: -1px;
      opacity: 1;
    }
  }

  .swiper-pagination-bullet-active {
    border: 2px solid #fff;
  }

  .swiper-button-prev,
  .swiper-button-next {
    border: 2px solid #fff;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    color: #fff;

    &:after {
      font-size: 1.2rem;
    }

    @media (min-width: 640px) {
      display: flex;
    }
  }

  .swiper-button-prev {
    left: 15px;

    @media (min-width: 768px) {
      left: 40px;
    }
  }

  .swiper-button-next {
    right: 15px;

    @media (min-width: 768px) {
      right: 40px;
    }
  }
}

.tada {
  animation: tada 6s infinite;

  @media (max-width: 419.98px) {
    max-width: 208px;
  }
}

@keyframes heading {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes button {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes tada {
  0% {
    transform: scale3d(1, 1, 1);
  }
  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
