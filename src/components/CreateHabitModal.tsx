// src/components/CreateHabitModal.tsx

import { Modal, Form, Input, Button, message } from 'antd';
import api from '../services/api';
import { Habit } from '../types/api';

// Definimos os tipos das propriedades que este componente recebe
interface CreateHabitModalProps {
  open: boolean;
  onClose: () => void;
  onHabitCreated: (newHabit: Habit) => void;
}

export default function CreateHabitModal({ open, onClose, onHabitCreated }: CreateHabitModalProps) {
  const [form] = Form.useForm();

  const onFinish = async (values: { name: string; description: string }) => {
    try {
      const response = await api.post('/api/v1/habits', {
        habit: {
          name: values.name,
          description: values.description,
        },
      });

      message.success('Hábito criado com sucesso!');
      onHabitCreated(response.data); // Envia o novo hábito de volta para a página do dashboard
      form.resetFields(); // Limpa o formulário
      onClose(); // Fecha o modal
    } catch (error) {
      console.error('Falha ao criar hábito:', error);
      message.error('Não foi possível criar o hábito.');
    }
  };

  return (
    <Modal
      title="Criar Novo Hábito"
      open={open}
      onCancel={onClose}
      footer={null} // Remove os botões de rodapé padrão, pois usaremos o do formulário
    >
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
        <Form.Item
          label="Nome do Hábito"
          name="name"
          rules={[{ required: true, message: 'Por favor, insira o nome do hábito!' }]}
        >
          <Input placeholder="Ex: Ler por 15 minutos" />
        </Form.Item>

        <Form.Item
          label="Descrição (Opcional)"
          name="description"
        >
          <Input.TextArea rows={4} placeholder="Ex: Qualquer livro técnico ou de ficção" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Criar Hábito
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
