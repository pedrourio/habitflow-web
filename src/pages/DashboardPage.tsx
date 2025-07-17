// src/pages/DashboardPage.tsx
import { Typography } from 'antd';
const { Title } = Typography;

export default function DashboardPage() {
  return (
    <div>
      <Title level={2}>Dashboard de Hábitos</Title>
      <p>Nossos hábitos e o progresso aparecerão aqui!</p>
    </div>
  );
}