
import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';

// Define o tipo de tema que aceitamos
type Theme = 'light' | 'dark';

// Define a "forma" do nosso contexto
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Cria o contexto com um valor padrão
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Cria o "provedor" do contexto
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Estado para guardar o tema atual, lendo do localStorage para persistência
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'light'; // O padrão é 'light' se nada for salvo
  });

  // Efeito para salvar o tema no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook customizado para facilitar o uso do contexto
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}