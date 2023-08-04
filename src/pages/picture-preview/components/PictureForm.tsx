import React, { FC, useCallback } from  'react';
import { Select, Form, Row, Col, Button } from 'antd';
import type { FormInstance } from 'antd/es/form';

const FormItem = Form.Item;

type IProps = {
    onChange?: (value: any) => void;
}

const PictureForm: FC<IProps> = ({ onChange }) => {
    const formRef = React.useRef<FormInstance>(null);

    const onFinish = useCallback((value: any) => {
        console.log('value', value)
        onChange?.(value);
    }, []);

    const onReset = useCallback(() => {
        formRef.current?.resetFields();
        onChange?.({});
    }, []);

    return (
        <div className="flex px-6 pt-6 border-0 border-b border-solid border-white h-[70px] text-white">
            <div className='flex-1'>
                <Form
                    ref={formRef}
                    layout="horizontal"
                    name="control-ref"
                    onFinish={onFinish}
                >
                    <Row gutter={24}>
                        <Col>
                            <FormItem label="角度" name="angle">
                                <Select className='w-40' options={[]} />
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="景别" name="scenery">
                                <Select className='w-40' options={[]} />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className='w-1/4 flex justify-end'>
                <Button type="link" className="text-white mr-2 hover:text-white" onClick={onReset}>重置</Button>
                <Button type="default" htmlType="submit">查询</Button>
            </div>
        </div>
    )
}

export default PictureForm;