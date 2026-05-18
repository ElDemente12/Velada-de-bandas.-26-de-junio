import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CarteleraPage from './pages/CarteleraPage';
import ContendientesPage from './pages/ContendientesPage';
import { AdminLoginPage, AdminDashboardPage } from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with public Layout */}
        <Route element={<Layout />}>
          <Route index element={<CarteleraPage />} />
          <Route path="votaciones" element={<HomePage />} />
          <Route path="contendientes" element={<ContendientesPage />} />
        </Route>

        {/* Secret Admin Routes */}
        <Route path="administrador/login" element={<AdminLoginPage />} />
        <Route path="administrador" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
