import { Footer } from '~/types';

export default defineEventHandler(async (event): Promise<Footer> => {
  const cosmic = useCosmic();

  try {
    const item = await cosmic.objects
      .findOne({ type: 'epikoinwnia' })
      .props(['metadata']);

    return {
      address: item.object.metadata.address,
      contact: Object.entries(
        item.object.metadata.contact_info.find((item: string) => item)
      ),
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch footer Cosmic CMS',
    });
  }
});
