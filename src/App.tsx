// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AppLayout from './components/AppLayout';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    // Rotas filhas que serão renderizadas dentro do <Outlet /> do AppLayout
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      // Em breve: { path: 'profile', element: <ProfilePage /> }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;