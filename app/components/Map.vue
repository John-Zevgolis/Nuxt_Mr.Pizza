<template>
  <div class="map-wrapper">
    <ClientOnly>
      <GoogleMap
        :api-key="apiKey"
        class="w-full h-[400px] md:h-[660px]"
        :center="center"
        :zoom="17"
        :styles="mapStyles"
      >
        <Marker :options="markerOptions" @click="infoOpen = true" />

        <InfoWindow
          v-if="infoOpen"
          :options="infoWindowOptions"
          @closeclick="infoOpen = false"
        >
          <p class="font-medium text-sm text-black">Απόλλωνος 71 & Αρτέμιδος</p>
        </InfoWindow>
      </GoogleMap>

      <template #fallback>
        <div class="h-[660px] flex justify-center items-center">
          <Loader />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';
import type { GeneralSettings } from '~/types';

const settings = useState<GeneralSettings | null>('app-settings');

const apiKey = 'AIzaSyDU6Mi5ypMyiA20j4aQ0ELbLxYGQ-m96R8';
const infoOpen = ref(false);

const center = {
  lat: 37.93722790686488,
  lng: 23.763348726809543,
};

const markerOptions = computed(() => ({
  position: center,
  label: null,
  animation: 2,
  icon: {
    url: settings.value?.logo?.url || '',
    scaledSize: { width: 84, height: 100 },
  },
}));

const infoWindowOptions = computed(() => ({
  position: center,
  maxWidth: 300,
  pixelOffset: { width: 0, height: -105 },
}));

const mapStyles = [
  {
    featureType: 'administrative.locality',
    elementType: 'all',
    stylers: [
      { hue: '#0049ff' },
      { saturation: 7 },
      { lightness: 19 },
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      { hue: '#ff0000' },
      { saturation: -100 },
      { lightness: 100 },
      { visibility: 'simplified' },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      { hue: '#ff0000' },
      { saturation: -100 },
      { lightness: 100 },
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      { hue: '#008eff' },
      { saturation: -93 },
      { lightness: 31 },
      { visibility: 'simplified' },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      { hue: '#008eff' },
      { saturation: -93 },
      { lightness: 31 },
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels',
    stylers: [
      { hue: '#bbc0c4' },
      { saturation: -93 },
      { lightness: -2 },
      { visibility: 'simplified' },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      { hue: '#007fff' },
      { saturation: -90 },
      { lightness: -8 },
      { visibility: 'simplified' },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      { hue: '#007fff' },
      { saturation: 10 },
      { lightness: 69 },
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ visibility: 'on' }, { color: '#bfd4e7' }, { lightness: 30 }],
  },
];
</script>

<style lang="scss" scoped>
.map {
  @media (max-width: 767.98px) {
    height: 440px !important;
  }
}
</style>
