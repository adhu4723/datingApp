import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 py-2 ">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
