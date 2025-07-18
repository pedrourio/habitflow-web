// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { Button, List, Spin, Typography, message } from 'antd';
import api from '../services/api';
import type { Habit } from '../types/api';
import CreateHabitModal from '../components/CreateHabitModal'; // 1. Importamos o modal
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 2. Estado para controlar o modal

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.get('/api/v1/habits');
        setHabits(response.data);
      } catch (error) {
        console.error('Falha ao buscar hábitos:', error);
        message.error('Não foi possível carregar seus hábitos.');
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  // 3. Função para atualizar a lista quando um hábito é criado
  const handleHabitCreated = (newHabit: Habit) => {
    // Adiciona o novo hábito no topo da lista existente
    setHabits([newHabit, ...habits]);
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>Meus Hábitos</Title>
        {/* 4. Botão que abre o modal */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Criar Hábito
        </Button>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={habits}
        renderItem={(habit) => (
          <List.Item>
            <List.Item.Meta
              title={habit.name}
              description={habit.description || 'Sem descrição'}
            />
          </List.Item>
        )}
      />

      {/* 5. O componente do modal em si */}
      <CreateHabitModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHabitCreated={handleHabitCreated}
      />
    </div>
  );
}