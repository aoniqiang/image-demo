export const DEFAULT_PAGE_SIZE = 30;

export type IPictureParams = {
  data: Record<string, string>;
  pageIndex?: number;
  pageSize?: number;
};

export type IPictureData = {
  value: string;
  label: string;
};

export type IPictureList = {
  loading: boolean;
  total: number;
  data: IPictureData[];
  pageSize: number;
  pageIndex: number;
  onChange: (pageSize: number, pageIndex: number) => void;
};

export type PaginationConfig = {
  pageIndex: number;
  pageSize: number;
};
