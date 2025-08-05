import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';
import { mockUsers } from './mocks/mockData';
import { useGitHubSearch } from '../hooks/useGitHubSearch';

jest.mock('../hooks/useGitHubSearch', () => ({
  useGitHubSearch: jest.fn(),
}));

describe('SearchBar component', () => {
  const mockOnResults = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button correctly', () => {
    const mockedUseGitHubSearch = useGitHubSearch as jest.Mock;
    mockedUseGitHubSearch.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<SearchBar onResults={mockOnResults} showRepo={null} />);

    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('shows loading spinner when isLoading is true', () => {
    const mockedUseGitHubSearch = useGitHubSearch as jest.Mock;
    mockedUseGitHubSearch.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<SearchBar onResults={mockOnResults} showRepo={null} />);
    expect(screen.getByLabelText('loading spinner')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('displays error message if error occurs', () => {
    const mockedUseGitHubSearch = useGitHubSearch as jest.Mock;
    mockedUseGitHubSearch.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<SearchBar onResults={mockOnResults} showRepo={null} />);

    expect(screen.getByText('Error fetching users.')).toBeInTheDocument();
  });

  it('displays "No users found" if data is empty array', () => {
    const mockedUseGitHubSearch = useGitHubSearch as jest.Mock;
    mockedUseGitHubSearch.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(<SearchBar onResults={mockOnResults} showRepo={null} />);

    expect(screen.getByText('No users found.')).toBeInTheDocument();
  });

  it('calls onResults when users are found', () => {
    const mockedUseGitHubSearch = useGitHubSearch as jest.Mock;
    mockedUseGitHubSearch.mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
    });

    render(<SearchBar onResults={mockOnResults} showRepo={null} />);

    expect(mockOnResults).toHaveBeenCalledWith(mockUsers);
  });
});
