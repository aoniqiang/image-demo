import React, { FC, useState, useEffect, useCallback } from 'react';
import VirtualList from 'rc-virtual-list';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IPictureList } from '../types';
import { PlaceholderSrc } from '../const';
import RViewerJS from 'viewerjs-react';
import 'viewerjs-react/dist/index.css';
import styled from '@emotion/styled';

const PictureList: FC<IPictureList> = ({ 
    data, 
    total, 
    onChange, 
    pageSize,
    pageIndex,
    loading
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

    const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        event.currentTarget.src = PlaceholderSrc;
        event.currentTarget.onerror = null;
    };

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
                        (image) => (
                            <RViewerJS>
                                <div key={image.label} className='w-48 h-48 p-4 flex justify-center items-center cursor-pointer'>
                                        <LazyLoadImage
                                            alt={image.label}
                                            src={image.value}
                                            width={'100%'}
                                            height={'100%'}
                                            effect="blur"
                                            onError={imageOnErrorHandler}
                                            placeholderSrc={PlaceholderSrc}
                                        />
                                </div>
                            </RViewerJS>
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