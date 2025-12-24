import { Banner, CosmicBanner } from '~/types';

export default defineEventHandler(async (): Promise<Banner[]> => {
  const cosmic = useCosmic();

  try {
    const items = await cosmic.objects
      .find({ type: 'banners' })
      .props(['id', 'title, thumbnail, metadata']);

    const banners = items.objects.map((item: CosmicBanner) => {
      return {
        id: item.id,
        title: item.title,
        image: item.metadata.slide.imgix_url,
        thumbnail: item.thumbnail,
        url: item.metadata.url,
      };
    });

    return banners;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch banners from Cosmic',
    });
  }
});
