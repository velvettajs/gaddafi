import type { DatabaseOptions } from '@velvetta/types';

export const Database: DatabaseOptions = {
  dbUri: process.env.DATABASE_URL as string,
};

export const CdnUrl: string = process.env.CDN_URL as string;
export const WebsiteUrl: string = process.env.WEBSITE_URL as string;
export const WebsiteName: string = process.env.WEBSITE_NAME as string;
export const WebsiteLogo: string = process.env.WEBSITE_LOGO as string;
