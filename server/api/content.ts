import { resolve } from 'node:dns';

export default defineEventHandler(
  async (event): Promise<{ title: string; content: string }> => {
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
        .props(['title', 'content']);

      return item.object;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch content Cosmic CMS',
      });
    }
  }
);
