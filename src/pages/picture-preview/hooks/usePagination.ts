import { useState } from 'react';
import { PaginationConfig, DEFAULT_PAGE_SIZE } from '../types';

const DEFAULT_PAGINATION = {
  pageIndex: 1,
  pageSize: DEFAULT_PAGE_SIZE,
} as const;

export default function usePagination(initialState?: PaginationConfig) {
  const [pagination, setPagination] = useState<PaginationConfig>({
    ...DEFAULT_PAGINATION,
    ...initialState,
  });

  const handleChange = (page: number, pageSize: number) => {
    setPagination((prev) => {
      if (page === prev.pageIndex && pageSize === prev.pageSize) return prev;
      return { ...prev, pageIndex: page, pageSize };
    });
  };

  return { ...pagination, onChange: handleChange };
}
