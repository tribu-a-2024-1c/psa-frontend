import './globals.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/core/layout';
import { ThemeProvider } from './components/theme-provider';
import Index from './pages';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
