import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import * as hooks from '../hooks/useGitHubRepos';
import { mockRepos, mockUsers } from './mocks/mockData';
import type { GitHubUser } from '../types/github';

jest.mock('../hooks/useGitHubRepos');

jest.mock('../components/SearchBar', () => ({
  __esModule: true,
  default: ({ onResults }: { onResults: (users: GitHubUser[]) => void }) => {
    return <button onClick={() => onResults(mockUsers)}>Trigger Search</button>;
  },
}));

const mockUseGitHubRepos = hooks.useGitHubRepos as jest.Mock;

describe('App integration test', () => {
  it('shows repo list after mock search and user click', () => {
    mockUseGitHubRepos.mockReturnValue({
      data: mockRepos,
      isLoading: false,
      isError: false,
    });

    render(<App />);

    fireEvent.click(screen.getByText('Trigger Search'));
    for (const { login } of mockUsers) {
      expect(screen.getByText(login)).toBeInTheDocument();
    }

    fireEvent.click(screen.getByText(mockUsers[0].login));
    for (const { name, html_url, description, stargazers_count } of mockRepos) {
      const link = screen.getByRole('link', { name: name });
      expect(link).toHaveAttribute('href', html_url);

      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
      expect(screen.getByText(stargazers_count)).toBeInTheDocument();
    }
  });
});
