import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CarteleraPage from './pages/CarteleraPage';
import ContendientesPage from './pages/ContendientesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<CarteleraPage />} />
          <Route path="votaciones" element={<HomePage />} />
          <Route path="contendientes" element={<ContendientesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
