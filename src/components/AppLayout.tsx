// src/components/AppLayout.tsx
import React from 'react';
import { HomeOutlined, LogoutOutlined, UserOutlined, MoonFilled, SunFilled } from '@ant-design/icons';
import { Layout, Menu, Typography, App, Switch, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { theme: appTheme, toggleTheme } = useTheme();

  const { token } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Logout realizado com sucesso!');
    navigate('/login');
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === '1') {
      navigate('/dashboard');
    } else if (key === '3') {
      handleLogout();
    }
  };

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
          onClick={handleMenuClick}
          items={[
            { key: '1', icon: <HomeOutlined />, label: 'Dashboard' },
            { key: '2', icon: <UserOutlined />, label: 'Meu Perfil' },
            { key: '3', icon: <LogoutOutlined />, label: 'Sair' },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: token.colorBgContainer, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <Title level={4} style={{ margin: 0 }}>Visão Geral</Title>
          <Switch
            checkedChildren={<SunFilled />}
            unCheckedChildren={<MoonFilled />}
            onChange={toggleTheme}
            checked={appTheme === 'light'}
          />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          {/* 4. Usa a mesma cor de fundo do tema para o container principal */}
          <div style={{ 
            padding: 24, 
            minHeight: 360, 
            background: token.colorBgContainer, // A MUDANÇA PRINCIPAL ESTÁ AQUI
            borderRadius: '8px' 
          }}>
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