import React from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="">
      <Navbar />
      <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}

export default Layout;
