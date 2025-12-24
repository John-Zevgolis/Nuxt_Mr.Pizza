import { CosmicIngredients, InnerItemType } from '~/types';

export default defineEventHandler(async (event): Promise<InnerItemType> => {
  const cosmic = useCosmic();
  const { slug } = getQuery(event);

  const item = await cosmic.objects
    .findOne({ slug })
    .props(['title', 'metadata'])
    .depth(1);

  return {
    title: item.object.title,
    banner: item.object.metadata.banner?.imgix_url,
    ingredients: item.object.metadata.ingredients.map(
      (ingredient: { item: string }) => ingredient.item
    ),
    ingredientsMenu:
      item.object.metadata.ylika_items &&
      item.object.metadata.ylika_items.length > 0
        ? item.object.metadata.ylika_items.map((yliko: CosmicIngredients) => {
            return {
              title: yliko.title,
              items: yliko.metadata.ingredients.map(
                (ingredient) => ingredient.item
              ),
            };
          })
        : [],
  };
});
