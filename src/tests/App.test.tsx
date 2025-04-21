import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Header from '../components/ui/header';
import Footer from '../components/ui/footer';
import ToolTable from '../components/ui/table';
import { ToolTableSkeleton } from '../components/ui/skeletonTable';
import ErrorComponent from '../components/ui/error';
import { useToolContext, ToolProvider } from '../context/context';

jest.mock('../context/context', () => ({
  useToolContext: jest.fn(),
  ToolProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('App Component', () => {
  beforeEach(() => {
    (useToolContext as jest.Mock).mockClear();
  });

  it('deve renderizar Header e Footer sempre', () => {
    (useToolContext as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      tools: [],
    });
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('deve renderizar ToolTableSkeleton quando loading for true', () => {
    (useToolContext as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      tools: [],
    });
    render(<App />);
    expect(screen.getByTestId('skeleton-table')).toBeInTheDocument();
    expect(screen.queryByTestId('tool-table')).toBeNull();
    expect(screen.queryByTestId('error-component')).toBeNull();
  });

  it('deve renderizar ErrorComponent quando error tiver uma mensagem', () => {
    const errorMessage = 'Erro ao carregar os dados.';
    (useToolContext as jest.Mock).mockReturnValue({
      loading: false,
      error: errorMessage,
      tools: [],
    });
    render(<App />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByTestId('tool-table')).toBeNull();
    expect(screen.queryByTestId('skeleton-table')).toBeNull();
  });

  it('deve renderizar ToolTable quando loading for false e error for null', () => {
    (useToolContext as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      tools: [{ id: 1, name: 'Ferramenta 1' }],
    });
    render(<App />);
    expect(screen.getByTestId('tool-table')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton-table')).toBeNull();
    expect(screen.queryByTestId('error-component')).toBeNull();
  });
});