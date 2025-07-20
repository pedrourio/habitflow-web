// src/pages/SignupPage.tsx
import { Button, Form, Input, Layout, message, theme, Typography } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

export default function SignupPage() {
  const navigate = useNavigate();

  const { token } = theme.useToken();

  const onFinish = async (values: any) => {
    try {
      await axios.post('http://localhost:3000/signup', {
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      });
      message.success('Cadastro realizado com sucesso! Por favor, faça o login.');
      navigate('/login');
    } catch (error: any) {
      console.error('Falha no cadastro:', error);
      const errorMessage = error.response?.data?.status?.message || 'Não foi possível realizar o cadastro.';
      message.error(errorMessage);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Content style={{ width: '100%', maxWidth: '400px', padding: '24px', background: token.colorBgContainer, borderRadius: '8px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Cadastro</Title>
        <Form name="signup" onFinish={onFinish} layout="vertical" requiredMark="optional">
          <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="E-mail" name="email" rules={[{ required: true, type: 'email', message: 'Por favor, insira um e-mail válido!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Senha" name="password" rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Cadastrar
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            Já tem uma conta? <Link to="/login">Faça o login!</Link>
          </div>
        </Form>
      </Content>
    </Layout>
  );
}