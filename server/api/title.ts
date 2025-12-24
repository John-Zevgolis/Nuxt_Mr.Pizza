export default defineEventHandler(
  async (event): Promise<{ title: string; url: string }> => {
    const cosmic = useCosmic();
    const { type } = getQuery(event);

    if (!type) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing type parameter',
      });
    }

    try {
      const item = await cosmic.objects
        .findOne({ type })
        .props(['title', 'slug']);

      return {
        title: item.object.title,
        url: item.object.slug,
      };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch title from Cosmic',
      });
    }
  }
);
