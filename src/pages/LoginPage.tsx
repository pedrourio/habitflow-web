// src/pages/LoginPage.tsx

import { Button, Form, Input, Layout, message, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        user: {
          email: values.email,
          password: values.password,
        },
      });

      // Pega o token do cabeçalho da resposta
      const token = response.headers.authorization;

      // Guarda o token no localStorage do navegador
      if (token) {
        localStorage.setItem('token', token);
        message.success('Login bem-sucedido!');
        // Redireciona para o dashboard
        navigate('/dashboard');
      } else {
        message.error('Token não encontrado na resposta.');
      }

    } catch (error: any) {
      console.error('Falha no login:', error);
      const errorMessage = error.response?.data?.error || 'E-mail ou senha inválidos.';
      message.error(errorMessage);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Content style={{ width: '100%', maxWidth: '400px', padding: '24px', background: '#fff', borderRadius: '8px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}