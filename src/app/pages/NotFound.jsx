import React from 'react'
import { Button, Flex, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate()
    return (
        <Flex gap="middle" align="center" vertical>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button onClick={() => navigate(-1)} type="primary">Back Home</Button>}
            />
        </Flex>
    )
}

export default NotFound
