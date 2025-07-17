// src/components/AppLayout.tsx
import React from 'react';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: '32px', margin: '16px', color: 'white', fontSize: '18px', textAlign: 'center' }}>
          HabitFlow
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', icon: <HomeOutlined />, label: 'Dashboard' },
            { key: '2', icon: <UserOutlined />, label: 'Meu Perfil' },
            { key: '3', icon: <LogoutOutlined />, label: 'Sair' },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff' }}>
          <Title level={4} style={{ margin: '16px 0' }}>Visão Geral</Title>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: '8px' }}>
            {/* O conteúdo da página (ex: DashboardPage) será renderizado aqui */}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          HabitFlow ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;