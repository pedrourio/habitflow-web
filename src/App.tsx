
import { App as AntAppProvider, ConfigProvider, theme as antdTheme } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AppLayout from './components/AppLayout';
import { ThemeProvider, useTheme } from './context/ThemeContext';


const router = createBrowserRouter([
  
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage/>,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);


function ThemedApp() {
  const { theme } = useTheme(); // 2. Pega o tema atual do nosso contexto

  return (
    <ConfigProvider
      theme={{
        // 3. Usa o algoritmo de cores do AntD baseado no nosso estado de tema
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#722ed1',
          colorLink: '#722ed1',
        },
      }}
    >
      <AntAppProvider>
        <RouterProvider router={router} />
      </AntAppProvider>
    </ConfigProvider>
  );
}


function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;