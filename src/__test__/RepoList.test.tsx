import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RepoList from '../components/RepoList';
import * as hooks from '../hooks/useGitHubRepos'; // penting: untuk bisa mock hook

jest.mock('../hooks/useGitHubRepos');

describe('RepoList component', () => {
  const mockUseGitHubRepos = hooks.useGitHubRepos as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner', () => {
    mockUseGitHubRepos.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<RepoList username="octocat" />);
    expect(screen.getByText('Loading repositories...')).toBeInTheDocument();
    expect(screen.getByLabelText('loading spinner')).toBeInTheDocument();
  });

  it('renders error message when isError is true', () => {
    mockUseGitHubRepos.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<RepoList username="octocat" />);
    expect(
      screen.getByText(/failed to load repositories/i)
    ).toBeInTheDocument();
  });

  it('renders "No repositories found." when data is empty', () => {
    mockUseGitHubRepos.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(<RepoList username="octocat" />);
    expect(screen.getByText(/no repositories found/i)).toBeInTheDocument();
  });

  it('renders list of repositories', () => {
    mockUseGitHubRepos.mockReturnValue({
      data: [
        {
          id: 1,
          name: 'repo-one',
          html_url: 'https://github.com/octocat/repo-one',
          description: 'First repo',
          stargazers_count: 42,
        },
        {
          id: 2,
          name: 'repo-two',
          html_url: 'https://github.com/octocat/repo-two',
          description: null,
          stargazers_count: 0,
        },
      ],
      isLoading: false,
      isError: false,
    });

    render(<RepoList username="octocat" />);

    expect(screen.getByText('repo-one')).toBeInTheDocument();
    expect(screen.getByText('repo-two')).toBeInTheDocument();
    expect(screen.getByText('First repo')).toBeInTheDocument();
    expect(screen.getByText('No description')).toBeInTheDocument();
    expect(screen.getAllByText(/repo-/i)).toHaveLength(2);
  });
});
