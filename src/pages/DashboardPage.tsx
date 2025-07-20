// src/pages/DashboardPage.tsx

import { useEffect, useState, useMemo } from 'react'; // 1. Importamos o useMemo
import { Button, List, Spin, Typography, message, Modal, Segmented } from 'antd'; // 2. Importamos o Segmented para o filtro
import api from '../services/api';
import type { Habit } from '../types/api';
import CreateHabitModal from '../components/CreateHabitModal';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons';

const { Title } = Typography;

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [filter, setFilter] = useState<string | number>('A Fazer'); // 3. Novo estado para o filtro
  const [modal, contextHolder] = Modal.useModal();

  const todayString = useMemo(() => new Date().toISOString().split('T')[0], []);

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

  // 4. Lógica para filtrar os hábitos
  const filteredHabits = useMemo(() => {
    return habits.filter(habit => {
      const isCheckedInToday = habit.checkins?.some(checkin => checkin.date === todayString);
      if (filter === 'Concluídos') return isCheckedInToday;
      if (filter === 'A Fazer') return !isCheckedInToday;
      return true; // Para o filtro "Todos"
    });
  }, [habits, filter, todayString]);

  const handleHabitUpdated = (updatedHabit: Habit) => {
    const habitIndex = habits.findIndex((h) => h.id === updatedHabit.id);
    if (habitIndex > -1) {
      const newHabits = [...habits];
      newHabits[habitIndex] = updatedHabit;
      setHabits(newHabits);
    } else {
      setHabits([updatedHabit, ...habits]);
    }
  };

  const handleCreate = () => {
    setEditingHabit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleDelete = (habitId: number) => {
    modal.confirm({
      title: 'Você tem certeza que quer apagar este hábito?',
      content: 'Esta ação não pode ser desfeita.',
      okText: 'Sim, apagar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await api.delete(`/api/v1/habits/${habitId}`);
          setHabits(habits.filter((habit) => habit.id !== habitId));
          message.success('Hábito apagado com sucesso!');
        } catch (error) {
          message.error('Não foi possível apagar o hábito.');
        }
      },
    });
  };

  const handleCheckin = async (habitId: number) => {
    try {
      const response = await api.post(`/api/v1/habits/${habitId}/checkins`, {
        checkin: { date: todayString }
      });
      
      // 5. Lógica para atualizar a interface imediatamente
      const newHabits = habits.map(habit => {
        if (habit.id === habitId) {
          // Adiciona o novo check-in à lista de check-ins do hábito
          return { ...habit, checkins: [...(habit.checkins || []), response.data] };
        }
        return habit;
      });
      setHabits(newHabits);

      message.success('Check-in realizado! Bom trabalho!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.[0] || 'Não foi possível fazer o check-in.';
      message.error(errorMessage);
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={2} style={{ margin: 0 }}>Meus Hábitos</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Criar Hábito
        </Button>
      </div>

      {/* 6. Componente de filtro */}
      <div style={{ marginBottom: '24px' }}>
        <Segmented
          options={['A Fazer', 'Concluídos', 'Todos']}
          value={filter}
          onChange={setFilter}
        />
      </div>

      <List
        itemLayout="horizontal"
        dataSource={filteredHabits} // 7. Usamos a lista filtrada aqui
        renderItem={(habit) => {
          const isCheckedInToday = habit.checkins?.some(checkin => checkin.date === todayString);
          return (
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={isCheckedInToday ? <CheckCircleFilled style={{ color: '#52c41a' }} /> : <CheckCircleOutlined />}
                  onClick={() => handleCheckin(habit.id)}
                  disabled={isCheckedInToday}
                >
                  {isCheckedInToday ? 'Concluído!' : 'Marcar Hoje'}
                </Button>,
                <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(habit)} />,
                <Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDelete(habit.id)} />,
              ]}
            >
              <List.Item.Meta
                title={habit.name}
                description={habit.description || 'Sem descrição'}
              />
            </List.Item>
          )
        }}
      />

      <CreateHabitModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHabitUpdated={handleHabitUpdated}
        habitToEdit={editingHabit}
      />

      {contextHolder}
    </div>
  );
}