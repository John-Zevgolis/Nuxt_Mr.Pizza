<template>
  <nav aria-label="socialItem">
    <ul class="flex">
      <li v-for="item in socials" :key="item.id" class="mr-3">
        <NuxtLink
          :aria-label="item.name"
          :to="item.url"
          @click="handleClick"
          class="text-white overflow-hidden flex justify-center items-center rounded-full text-lg size-10 border-2 border-white relative transition-all duration-300"
        >
          <Icon class="relative" :name="getIcon[`${item.name as IconName}`]" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { SocialItem } from '~/types';

type IconName = 'pizza-button' | 'contact-button';

const getIcon = {
  'pizza-button': 'fa6-solid:pizza-slice',
  'contact-button': 'fa6-solid:phone',
};

const props = defineProps<{
  socials: SocialItem[];
  closeOnClick?: boolean;
}>();

const close = inject<() => void>('close', () => {});

const handleClick = () => {
  if (props.closeOnClick && close) close();
};
</script>

<style scoped lang="scss">
a {
  &:before {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    position: absolute;
    transition: all 0.3s;
    transform: scale(0);
    background: #97211a;
  }

  &:hover {
    border-color: #97211a;

    &:before {
      transform: none;
    }
  }
}
</style>
