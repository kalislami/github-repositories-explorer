import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { FaSpinner, FaStar } from 'react-icons/fa';
import type { GitHubRepo } from '../types/github';

interface Props {
  username: string;
}

const RepoList = ({ username }: Props) => {
  const { data, isLoading, isError } = useGitHubRepos(username);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !data) {
    return <ErrorState />;
  }

  return (
    <div className="bg-white pb-4">
      <ul className="space-y-4 max-h-[70vh] overflow-y-auto">
        {data.length === 0 ? (
          <EmptyState />
        ) : (
          data.map((repo) => <RepoItem key={repo.id} repo={repo} />)
        )}
      </ul>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex justify-center items-center min-h-[50px]">
    <div className="flex items-center gap-2 text-sm text-theme-text-3">
      <FaSpinner
        aria-label="loading spinner"
        className="animate-spin text-base"
      />
      Loading repositories...
    </div>
  </div>
);

const ErrorState = () => (
  <p className="text-sm text-red text-center">Failed to load repositories.</p>
);

const EmptyState = () => (
  <li className="text-sm text-theme-text-3 py-2 text-center">
    No repositories found.
  </li>
);

const RepoItem = ({ repo }: { repo: GitHubRepo }) => (
  <li className="flex justify-between items-start border-b bg-theme-gray-3 last:border-none p-4 rounded-sm shadow">
    <div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-theme-text-1 font-bold md:font-medium hover:underline"
      >
        {repo.name}
      </a>
      <p className="text-sm text-theme-text-1">
        {repo.description || 'No description'}
      </p>
    </div>
    <div className="flex items-center gap-1 text-sm text-theme-text-1 font-bold md:font-medium min-w-[60px] justify-end">
      <span>{repo.stargazers_count}</span>
      <FaStar />
    </div>
  </li>
);

export default RepoList;
