import './globals.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/core/layout';
import { ThemeProvider } from './components/theme-provider';
import {
  AddProjectPage,
  AddTaskPage,
  ExamplePage,
  ProjectPage,
  TaskPage,
} from './pages';
import { SupportPage } from './pages/support/support-page';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ExamplePage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/projects/new" element={<AddProjectPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/tasks/new" element={<AddTaskPage />} />
            <Route path="/tickets" element={<SupportPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
