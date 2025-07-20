// src/pages/ProfilePage.tsx
import { useEffect, useState } from 'react';
// 1. Importe o 'App' do antd para usar o hook
import { Typography, Form, Input, Button, message, Spin, Descriptions, App } from 'antd';
import type { User } from '../types/api';
import api from '../services/api';

const { Title } = Typography;

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { message: antMessage } = App.useApp(); //Usando o hook para pegar a instância da message

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/v1/profile');
        // A API está retornando um objeto aninhado, ira pegar o conteúdo de 'data'
        const userData = response.data.data ? response.data.data : response.data;
        setUser(userData);
        form.setFieldsValue(userData);
      } catch (error) {
        antMessage.error('Não foi possível carregar os dados do perfil.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [form, antMessage]);

  const onFinish = async (values: { name: string }) => {
    try {
      const response = await api.put('/api/v1/profile', { user: values });
      const userData = response.data.data ? response.data.data : response.data;
      setUser(userData);
      antMessage.success('Perfil atualizado com sucesso!');
    } catch (error) {
      antMessage.error('Não foi possível atualizar o perfil.');
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} />;
  }

  return (
    <div>
      <Title level={2}>Meu Perfil</Title>
      {user && (
        <Descriptions bordered column={1} style={{ marginBottom: 24 }}>
          {/* O e-mail pode vir aninhado em attributes dependendo do serializer */}
          <Descriptions.Item label="Nome">{user.name || (user as any).attributes?.name}</Descriptions.Item>
          <Descriptions.Item label="E-mail">{user.email || (user as any).attributes?.email}</Descriptions.Item>
          

        </Descriptions>
      )}

      <Title level={4}>Atualizar informações</Title>
      
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'O nome é obrigatório' }]}>
          <Input />
        {/* </Form.Item>
        <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'O email é obrigatório' }]}>
          <Input /> */}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar Alterações
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}