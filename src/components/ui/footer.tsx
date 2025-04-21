export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 border-t">
      <p>
        &copy; {new Date().getFullYear()} Todos os direitos reservados à{' '}
        <a
          href="https://github.com/melgacoc"
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
