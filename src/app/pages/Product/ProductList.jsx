import React, { useEffect, useState } from 'react';
import { Button, Divider, Flex, Image, Modal, Skeleton, Table, message } from 'antd';
import { Typography } from 'antd';
import { useDeleteProductMutation, useGetProductsMutation } from '../../../redux/api/productApi';
import {
    DeleteOutlined,
    FormOutlined
} from '@ant-design/icons';
import ProductForm from './ProductForm';

const { Title, Text } = Typography;

const ProductList = () => {
    const [messageApi, messageContextHolder] = message.useMessage();
    const [modal, modalContextHolder] = Modal.useModal();
    const [currentPage, setCurrentPage] = React.useState(1);
    const [getProducts, { isLoading: isProductsLoading, data }] = useGetProductsMutation();
    const [deleteProduct, { isLoading, isSuccess, isError }] = useDeleteProductMutation();

    const pageSize = 10; // Number of items per page
    const [productForm, setProductForm] = useState({ show: false, details: null });

    useEffect(() => {
        if (isSuccess) {
            messageApi.open({
                type: 'success',
                content: 'Product is deleted successfully!',
            });
            getProducts()
        }

        if (isError) {
            messageApi.open({
                type: 'error',
                content: 'Something went wrong!',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleImagePreview = (imageUrl) => {
        Modal.info({
            title: 'Image Preview',
            content: imageUrl ? <Image src={imageUrl} preview={false} /> : <Skeleton.Image active={true} block={true} />,
        });
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    };

    const handleOk = () => {
        getProducts();
        setProductForm({ show: false, details: null }) // Close the modal after form submission
    };

    const handleCancel = () => {
        setProductForm({ show: false, details: null })
    };

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            key: 'sno',
            width: 100,
            padding: 2,
            render: (text, record, index) => isProductsLoading ? <Skeleton.Input size='small' block loading={isProductsLoading} active /> : (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 500,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <p className='text-warp' title={text}>{text}</p>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            width: 200,
            render: (text, record) =>isProductsLoading ? <Skeleton block loading={isProductsLoading} active /> : <Text type="success" style={{ cursor: 'pointer' }} onClick={() => handleImagePreview(text)}>Click here to preview</Text>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (text, record) => isProductsLoading ? <Skeleton.Input size='small' block loading={isProductsLoading} active /> : <Flex gap="small" justify='space-between' align='center'>
                <Button type="primary" icon={<FormOutlined />} onClick={() => setProductForm({ show: true, details: record?.id })} />
                <Button danger icon={<DeleteOutlined />}
                    onClick={async () => {
                        const confirmed = await modal.confirm({
                            title: 'Attention!',
                            content: 'Are you sure you want to delete this product?',
                        });
                        if (confirmed) {
                            await deleteProduct(record?.id)
                        }
                    }}
                />
            </Flex>
        },
    ];

    const loadableColumns = Array(5).fill({
        'sno': <Skeleton block loading={isProductsLoading} active />,
        'title':<Skeleton block loading={isProductsLoading} active />,
        'category':<Skeleton block loading={isProductsLoading} active />,
        'description':<Skeleton block loading={isProductsLoading} active />,
        'price':<Skeleton block loading={isProductsLoading} active />,
        'image':<Skeleton block loading={isProductsLoading} active />,
        'action':<Skeleton block loading={isProductsLoading} active />,
    });

    return (
        <>
            {messageContextHolder}
            {modalContextHolder}
            <div>
                <Flex justify='space-between' align='center'>
                    <Title level={2}>Product List</Title>
                    <Button type="primary" size='large' onClick={() => setProductForm({ show: true, details: null })}>Add Product</Button>
                </Flex>

                <Divider />
                
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={isProductsLoading ? loadableColumns : data}
                    pagination={isProductsLoading ? false : {
                        pageSize: pageSize,
                        current: currentPage,
                        total: data?.length,
                    }}
                    onChange={handleTableChange}
                    scroll={{ y: 550 }}
                />
            </div>
            <ProductForm
                open={productForm.show}
                details={productForm.details}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </>
    )
}

export default ProductList;