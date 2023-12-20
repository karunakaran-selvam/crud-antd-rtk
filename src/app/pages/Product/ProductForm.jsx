import { Form, Input, InputNumber, Modal, Skeleton, message } from 'antd'
import React, { useEffect } from 'react'
import { useCreateProductMutation, useGetProductByIdMutation, useUpdateProductMutation } from '../../../redux/api/productApi';

function ProductForm({ formData, onOk, ...props }) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const [createProduct, { isLoading: isCreateProductLoading, isError: isCreateProductError, isSuccess: isCreateProductSuccess }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdateProductLoading, isError: isUpdateProductError, isSuccess: isUpdateProductSuccess }] = useUpdateProductMutation();
    const [getProductById, { isLoading, data }] = useGetProductByIdMutation();

    useEffect(() => {
        if (props.open) {
            form.resetFields(); // Reset form fields when the modal is opened
        }
    }, [form, props.open]);

    useEffect(() => {
        // Use setFieldsValue to set initial form values when data is available
        form.setFieldsValue({
            title: data?.title || '',
            price: data?.price || '',
            description: data?.description || '',
            image: data?.image || '',
            category: data?.category || '',
        });
    }, [data, form]);

    useEffect(() => {
        if (props?.details) {
            getProductById(props?.details)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.details])

    useEffect(() => {
        if (isCreateProductSuccess) {
            messageApi.open({
                type: 'success',
                content: 'Product is created successfully!',
            });
        }

        if (isCreateProductError) {
            messageApi.open({
                type: 'error',
                content: 'Something went wrong!',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCreateProductLoading]);

    useEffect(() => {
        if (isUpdateProductSuccess) {
            messageApi.open({
                type: 'success',
                content: 'Product is updated successfully!',
            });
        }

        if (isUpdateProductError) {
            messageApi.open({
                type: 'error',
                content: 'Something went wrong!',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdateProductLoading]);

    const onFinish = async () => {
        try {
            await form.validateFields(); // Validate form fields
            // If validation succeeds, call the onOk callback provided by the parent component
            const payload = { ...form.getFieldsValue() }

            if (props?.details) {
                updateProduct({ body: payload, id: props?.details })
            }
            else {
                createProduct(payload)
            }
            setTimeout(async () => {
                await form.resetFields(); // Reset form fields after a short delay
                await onOk();
            }, 500);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    }

    return (
        <Modal
            title={`${props?.details ? 'Update' : 'Create'} Product`}
            centered
            okText={'Submit'}
            onOk={onFinish}  // Use onFinish as the onOk handler
            {...props}
        >
            {contextHolder}

            <Form
                form={form}
                layout="vertical"
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                className="custom-form"
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!'
                        },
                    ]}
                >
                    {isLoading ? <Skeleton.Input active={true} block={true} /> :
                        <Input allowClear />}
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!'
                        },
                    ]}
                >
                    {isLoading ? <Skeleton.Input active={true} block={true} /> : <InputNumber
                        allowClear
                        style={{
                            width: '100%',
                        }}
                    />}
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!'
                        },
                    ]}
                >
                    {isLoading ? <Skeleton.Input active={true} block={true} /> : <Input.TextArea allowClear showCount />}
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!'
                        },
                    ]}
                >
                    {isLoading ? <Skeleton.Input active={true} block={true} /> : <Input allowClear />}
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required!'
                        },
                    ]}
                >
                    {isLoading ? <Skeleton.Input active={true} block={true} /> : <Input allowClear />}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ProductForm
