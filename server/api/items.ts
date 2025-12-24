import { CosmicItem, Item } from '~/types';

export default defineEventHandler(async (event): Promise<Item[]> => {
  const cosmic = useCosmic();
  const { type } = getQuery(event);

  const items = await cosmic.objects
    .find({ type })
    .props(['id', 'title', 'slug', 'thumbnail', 'metadata'])
    .depth(0);

  return items.objects.map((item: CosmicItem) => {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      thumbnail: item.thumbnail,
      hasOverlay: item.metadata.has_overlay,
    };
  });
});
