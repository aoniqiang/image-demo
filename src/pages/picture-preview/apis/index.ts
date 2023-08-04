import { IPictureData, PaginationConfig } from '../types';
import { transformData } from '../utils';
import { Logos } from '@/assets';

export function queryPicture(params: PaginationConfig) {
  console.log('queryPicture', params);
  return new Promise<{
    list: IPictureData[];
    total: number;
    code: number;
    message?: string;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        list: transformData({ ...params, data: Logos }),
        total: Object.keys(Logos).length || 0,
      });
    }, 50);
  });
}
