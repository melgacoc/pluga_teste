import React from 'react';

export default function Footer() {
  return (
    <footer
      className="bg-white shadow-up-md text-center text-sm text-gray-500 py-4 border-t rounded-t-2xl"
      data-testid="footer"
    >
      <p>
        &copy; {new Date().getFullYear()} Todos os direitos reservados à{' '}
        <a
          href="https://github.com/melgacoc/pluga_teste"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 font-semibold"
        >
          Cláudio Melgaço
        </a>
      </p>
    </footer>
  );
}
