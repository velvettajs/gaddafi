import type { DatabaseOptions } from '@velvetta/types';

export const Database: DatabaseOptions = {
  dbUri: process.env.DATABASE_URL as string,
};
