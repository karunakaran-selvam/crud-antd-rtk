import { Flex, Spin } from 'antd'
import React from 'react'

function Loader() {
    return (
        <Flex align="center" gap="middle">
            <Spin spinning={true} fullscreen />
        </Flex>
    )
}

export default Loader
