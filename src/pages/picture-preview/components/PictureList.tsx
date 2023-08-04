import React, { FC, useState, useEffect, useCallback } from 'react';
import VirtualList from 'rc-virtual-list';
import { IPictureList } from '../types';
import { Spin } from 'antd';
import styled from '@emotion/styled';

const PictureList: FC<IPictureList> = ({ 
    data, 
    loading, 
    total, 
    onChange, 
    pageSize,
    pageIndex
}) => {
    const [height, setHeight] = useState<number>(300);

    const onScroll = useCallback((e: React.UIEvent<HTMLElement, UIEvent>) => {
        const { scrollHeight, scrollTop } = e.currentTarget;
        if (scrollHeight - scrollTop !== height) return;

        if (pageSize * pageIndex < total) {
            const page = pageIndex + 1;
            onChange(page, pageSize);
        };
    }, [total, onChange, pageSize, pageIndex]);

    const handleCurrentHeight = useCallback(() => {
        const divElm = document.getElementById('picture-box');
        if (divElm) {
            const { height } = divElm.getBoundingClientRect();
            setHeight(height);
        }
    }, []);

    useEffect(() => {
        handleCurrentHeight();
        window.addEventListener('resize', handleCurrentHeight)
        return () => {
            window.removeEventListener('resize', handleCurrentHeight)
        }
    }, []);

    return (
        <ListComponent className='flex flex-1 overflow-hidden' id="picture-box">
            <VirtualList 
                data={data} 
                itemKey={'id'} 
                onScroll={onScroll} 
                height={height}
            >
                {
                    (item) => (
                        <div key={item.label} className='w-48 h-48 p-4 flex justify-center items-center'>
                            <img className='object-contain' src={item.value} alt={item.label} />
                        </div>
                    )
                }
            </VirtualList>
        </ListComponent>
    )
}

const ListComponent = styled.div`
  .rc-virtual-list-holder-inner {
    position: static !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
  }
`;

export default PictureList;