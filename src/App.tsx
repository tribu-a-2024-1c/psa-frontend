import './globals.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/core/layout';
import { ThemeProvider } from './components/theme-provider';
import {
  AddProjectPage,
  AddTaskPage,
  DashboardPage,
  ProjectPage,
  TaskPage,
} from './pages';
import { ProductsPage } from './pages/products/products-page';
import { AddTicketPage } from './pages/support/add-ticket-page';
import { EditTicketPage } from './pages/support/edit-ticket-page';
import { SupportPage } from './pages/support/support-page';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/projects/new" element={<AddProjectPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/tasks/new" element={<AddTaskPage />} />
            <Route path="/tickets" element={<SupportPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/tickets/new" element={<AddTicketPage />} />
            <Route
              path="/tickets/edit/:ticketId"
              element={<EditTicketPage />}
            />
            <Route
              path="/tasks/edit/:projectId/:taskId"
              element={<AddTaskPage />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
