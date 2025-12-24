import { useCosmic } from '../utils';
import type { GeneralSettings, CosmicSocialItem } from '../../app/types';

export default defineEventHandler(async (event): Promise<GeneralSettings> => {
  const cosmic = useCosmic();

  try {
    const [logoRes, socialRes] = await Promise.all([
      cosmic.media
        .findOne({ id: '64987fd77df15a13847d748e' })
        .props(['imgix_url', 'alt_text']),
      cosmic.objects.find({ type: 'social' }).props(['id', 'slug', 'metadata']),
    ]);

    return {
      logo: {
        url: logoRes.media.imgix_url,
        alt: logoRes.media.alt_text,
      },
      socials: socialRes.objects.map((item: CosmicSocialItem) => ({
        id: item.id,
        name: item.slug,
        url: item.metadata.url,
      })),
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch settings from Cosmic',
    });
  }
});
