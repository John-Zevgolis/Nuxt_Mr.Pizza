<template>
  <main
    v-if="item"
    class="item relative min-h-screen overflow-hidden"
    :class="mainClasses"
  >
    <NuxtImg
      v-if="item?.banner"
      class="object-cover inset-0 absolute -z-10 w-full h-full"
      loading="lazy"
      :src="item.banner"
      :alt="item.title"
    />
    <div
      class="custom-padding-top relative px-3 w-full sm:max-w-[540px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto"
      :class="boxClasses"
    >
      <h1
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { duration: 300, delay: 300 },
        }"
        class="mb-6"
      >
        <span
          class="bg-[#97211a] leading-none text-white rounded-sm font-bold inline-block text-2xl md:text-3xl xl:text-4xl px-6 py-3"
          v-html="item.title"
        ></span>
      </h1>
      <ul
        v-if="item.ingredientsMenu.length === 0"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { duration: 300, delay: 300 },
        }"
        class="ingredients flex flex-col md:flex-row rounded-sm"
      >
        <li
          v-for="(ingredient, index) in item?.ingredients"
          :key="index"
          class="border border-black/10 bg-white py-2 px-4"
        >
          {{ ingredient }}
        </li>
      </ul>
      <div v-if="item.ingredientsMenu.length > 0" class="flex flex-wrap -mx-3">
        <div
          v-for="(mainIngredient, mainIngredientIndex) in item.ingredientsMenu"
          :key="mainIngredientIndex"
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visible="{
            opacity: 1,
            x: 0,
            transition: {
              duration: 300,
              delay: 300 + mainIngredientIndex * 0.05,
            },
          }"
          class="w-full md:w-1/3 mb-6 md:mb-0 px-3"
        >
          <div class="bg-white rounded-sm">
            <h2 class="p-4 font-medium text-xl">{{ item.title }}</h2>
            <ul>
              <li
                v-for="(ingredient, ingredientIndex) in mainIngredient.items"
                class="border border-[rgba(0,0,0,0.125)] py-2 px-4"
                :key="ingredientIndex"
              >
                {{ ingredient }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { InnerItemType } from '~/types';

const props = defineProps<{
  item: InnerItemType;
}>();

const mainClasses = computed(() =>
  props.item?.ingredientsMenu.length === 0 ? 'flex items-center' : ''
);

const boxClasses = computed(() => {
  if ((props.item?.ingredientsMenu?.length ?? 0) > 0) {
    return 'pb-12 md:max-w-none';
  } else {
    return 'custom-padding-bottom md:max-w-[720px]';
  }
});
</script>

<style lang="scss" scoped>
.item {
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }
}

.ingredients {
  li {
    &:first-child {
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
    }

    &:last-child {
      border-bottom-right-radius: inherit;
      border-bottom-left-radius: inherit;
    }

    @media (min-width: 768px) {
      &:first-child {
        border-bottom-left-radius: inherit;
        border-top-left-radius: inherit;
        border-top-right-radius: initial;
      }

      &:last-child {
        border-bottom-right-radius: inherit;
        border-top-right-radius: inherit;
        border-bottom-left-radius: initial;
      }
    }
  }
}
</style>
