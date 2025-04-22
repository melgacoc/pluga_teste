import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { mock } from '../utils/mock';
import { useToolContext, ToolProvider } from '../context/context';

jest.mock('../context/context', () => ({
  useToolContext: jest.fn(),
  ToolProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const getMockContext = (overrides = {}) => ({
  loading: false,
  error: null,
  tools: [],
  filteredTools: [],
  recentTools: [],
  fetchTools: jest.fn(),
  addRecentTool: jest.fn(),
  setFilteredTools: jest.fn(),
  toggleFavoriteTool: jest.fn(),
  favoriteTools: [],
  attFavoriteTools: jest.fn(),
  ...overrides,
});

describe('App Component', () => {
  beforeEach(() => {
    (useToolContext as jest.Mock).mockClear();
  });

  it('deve renderizar Header e Footer sempre', () => {
    (useToolContext as jest.Mock).mockReturnValue(getMockContext());
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('deve renderizar ToolTableSkeleton quando loading for true', () => {
    (useToolContext as jest.Mock).mockReturnValue(getMockContext({ loading: true }));
    render(<App />);
    expect(screen.getByTestId('skeleton-table')).toBeInTheDocument();
    expect(screen.queryByTestId('tool-table')).toBeNull();
    expect(screen.queryByTestId('error-component')).toBeNull();
  });

  it('deve renderizar ErrorComponent quando error tiver uma mensagem', () => {
    const errorMessage = 'Erro ao carregar os dados.';
    (useToolContext as jest.Mock).mockReturnValue(getMockContext({ error: errorMessage }));
    render(<App />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByTestId('tool-table')).toBeNull();
    expect(screen.queryByTestId('skeleton-table')).toBeNull();
  });

  it('deve renderizar ToolTable com dados do mock quando loading for false e error for null', () => {
    (useToolContext as jest.Mock).mockReturnValue(getMockContext({
      tools: mock,
      filteredTools: mock,
    }));
    render(<App />);
    expect(screen.getByTestId('tool-table')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton-table')).toBeNull();
    expect(screen.queryByTestId('error-component')).toBeNull();

    expect(screen.getByText(mock[0].name)).toBeInTheDocument();
  });

  it('deve renderizar ToolTable com os dados filtrados', () => {
    (useToolContext as jest.Mock).mockReturnValue(getMockContext({
      tools: mock,
      filteredTools: [mock[0]],
    }));
    render(<App />);
    expect(screen.getByTestId('tool-table')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton-table')).toBeNull();
    expect(screen.queryByTestId('error-component')).toBeNull();

    expect(screen.getByText(mock[0].name)).toBeInTheDocument();
  });
});
