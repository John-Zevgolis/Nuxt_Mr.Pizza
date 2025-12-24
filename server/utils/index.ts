import { createBucketClient } from '@cosmicjs/sdk';

export const useCosmic = () => {
  const config = useRuntimeConfig();

  return createBucketClient({
    bucketSlug: config.cosmicBucketSlug as string,
    readKey: config.cosmicReadKey as string,
  });
};
