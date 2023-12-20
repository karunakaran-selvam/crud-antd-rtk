import React from 'react';
import AppRouter from './routes';
import { Layout } from 'antd';

const App = () => {

  const { Content, Footer } = Layout;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '0 50px' }}>
        <AppRouter />
      </Content>
      <Footer style={{
        textAlign: 'center',
      }}
      >
        CRUD App Using Ant Design
      </Footer>
    </Layout>)
};

export default App;
