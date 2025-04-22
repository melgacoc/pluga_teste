import React from 'react';

export default function Header() {
  return (
    <header
      className="bg-white shadow-md border-b border-gray-200 py-5 px-8 flex items-center justify-between rounded-b-2xl relative"
      data-testid="header"
    >
      <a href="https://pluga.co/" target="_blank" rel="noopener noreferrer">
        <img src="/logo.png" alt="Pluga Logo" className="h-10" />
      </a>
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold tracking-wide">
        Ferramentas de Integração Pluga
      </h1>
      <div className="w-10" />
    </header>
  );
}
