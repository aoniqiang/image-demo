
import React from 'react';
import PictureList from '../components/PictureList';
import PictureForm from '../components/PictureForm';
import useFetchImage from '../hooks/useFetchImage';

function PicturePreview() {
    const { 
        onFinish, 
        data, 
        loading, 
        total, 
        onChange, 
        pageSize,
        pageIndex 
    } = useFetchImage();

    return (
        <div className='flex h-full'>
            <div className='w-40 mr-4 border border-solid border-white'>
                <h4 className='text-base font-medium text-white p-4'>图库分类</h4>
            </div>
            <div className='flex flex-1 flex-col border border-solid border-white'>
                <PictureForm onChange={onFinish}/>
                <PictureList 
                    data={data}
                    loading={loading} 
                    total={total}
                    onChange={onChange}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                />
            </div>
        </div>
    )
}

export default PicturePreview;