// src/components/CreateHabitModal.tsx
import { Modal, Form, Input, Button, message } from 'antd';
import { useEffect } from 'react';
import api from '../services/api';
import type { Habit } from '../types/api';

interface CreateHabitModalProps {
  open: boolean;
  onClose: () => void;
  onHabitUpdated: (updatedHabit: Habit) => void; 
  habitToEdit: Habit | null; // Nova prop para receber o hábito a ser editado
}

export default function CreateHabitModal({ open, onClose, onHabitUpdated, habitToEdit }: CreateHabitModalProps) {
  const [form] = Form.useForm();
  const isEditing = !!habitToEdit; // Variável para saber se estamos editando

  //Efeito para preencher o formulário quando um hábito é passado para edição
  useEffect(() => {
    if (habitToEdit) {
      form.setFieldsValue({
        name: habitToEdit.name,
        description: habitToEdit.description,
      });
    } else {
      form.resetFields();
    }
  }, [habitToEdit, form]);

  const onFinish = async (values: { name: string; description: string }) => {
    try {
      const payload = { habit: { name: values.name, description: values.description } };
      let response;

      // Lógica para decidir entre criar (POST) ou atualizar (PUT)
      if (isEditing) {
        response = await api.put(`/api/v1/habits/${habitToEdit.id}`, payload);
        message.success('Hábito atualizado com sucesso!');
      } else {
        response = await api.post('/api/v1/habits', payload);
        message.success('Hábito criado com sucesso!');
      }

      onHabitUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Falha ao salvar hábito:', error);
      message.error('Não foi possível salvar o hábito.');
    }
  };

  return (
    <Modal
      title={isEditing ? 'Editar Hábito' : 'Criar Novo Hábito'} // 5. Título dinâmico
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
        {}
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
            {isEditing ? 'Salvar Alterações' : 'Criar Hábito'} {/* 6. Texto do botão dinâmico */}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}