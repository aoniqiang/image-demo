import { IPictureData, IPictureParams, DEFAULT_PAGE_SIZE } from '../types';

export function transformData({
  data,
  pageIndex = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: IPictureParams): IPictureData[] {
  return Object.values(data)
    .filter((_, index) => {
      const end = pageIndex * pageSize;
      const start = end - pageSize;
      return index >= start && index < end;
    })
    .map((item) => ({
      value: item,
      label: item,
    }));
}
