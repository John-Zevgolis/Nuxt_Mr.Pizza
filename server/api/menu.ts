import { MenuItem } from '~/types';

export default defineEventHandler(async (event): Promise<MenuItem[]> => {
  const cosmic = useCosmic();

  try {
    const items = await Promise.all([
      cosmic.objects.find({ type: 'home' }).props(['id', 'slug', 'title']),
      cosmic.objects.find({ type: 'pizza' }).props(['id', 'slug', 'title']),
      cosmic.objects
        .find({ type: 'makaronades' })
        .props(['id', 'slug', 'title']),
      cosmic.objects
        .find({ type: 'synodeutika' })
        .props(['id', 'slug', 'title']),
      cosmic.objects
        .find({ type: 'timokatalogos' })
        .props(['id', 'slug', 'title']),
      cosmic.objects
        .find({ type: 'epikoinwnia' })
        .props(['id', 'slug', 'title']),
    ]);

    const menu = items.map((item) => {
      if (item.objects[0].slug.includes('home')) {
        item.objects[0].slug = '';
      }
      return item.objects[0];
    });

    return menu;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch menu from Cosmic',
    });
  }
});
