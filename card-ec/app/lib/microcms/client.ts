import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,  // service-domain は https://XXXX.microcms.io の XXXX 部分
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});