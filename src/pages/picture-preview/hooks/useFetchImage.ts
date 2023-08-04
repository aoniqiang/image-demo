import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryPicture } from '../apis';
import { IPictureData } from '../types';
import { message } from 'antd';
import usePagination from './usePagination';

const useFetchImage = () => {
  const [data, setData] = useState<IPictureData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { pageSize, pageIndex, onChange } = usePagination({
    pageIndex: 1,
    pageSize: 40,
  });
  const queryClient = useQueryClient();

  const { isFetching } = useQuery({
    queryKey: [queryPicture.name, pageSize, pageIndex],
    queryFn: () => queryPicture({ pageSize, pageIndex }),
    onSuccess: (res) => {
      const { code, list, total, message: msg } = res;
      if (code !== 0) {
        void message.error(msg);
        return;
      }
      setData((pre) => (pageSize === 1 ? list : [...pre, ...list]));
      setTotal(total);
    },
    onError: (err) => {
      console.log('response===30', err);
    },
  });

  const onFinish = useCallback((value: any) => {
    console.log('value', value);
  }, []);

  return {
    data,
    total,
    loading: isFetching,
    onChange,
    onFinish,
    pageSize,
    pageIndex,
  };
};

export default useFetchImage;
