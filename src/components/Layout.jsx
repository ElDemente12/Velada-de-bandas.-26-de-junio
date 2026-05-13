import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen relative flex flex-col immersive-border">
      <div className="scanline fixed inset-0 z-50 pointer-events-none opacity-20" />
      <div className="fixed inset-0 ring-glow z-0 pointer-events-none" />
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}
