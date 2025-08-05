import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { FaSpinner, FaStar } from 'react-icons/fa';

interface Props {
  username: string;
}

const RepoList = ({ username }: Props) => {
  const { data, isLoading, isError } = useGitHubRepos(username);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50px]">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaSpinner aria-label="loading spinner" className="animate-spin text-base" />
          Loading repositories...
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-red-500 text-center">
        Failed to load repositories.
      </p>
    );
  }

  return (
    <div className="bg-white">
      <ul className="space-y-4 max-h-[70vh] overflow-y-auto">
        {data.length === 0 ? (
          <li className="text-sm text-gray-500 py-2 text-center">
            No repositories found.
          </li>
        ) : (
          data.map((repo) => (
            <li
              key={repo.id}
              className="flex justify-between items-start border-b bg-gray-300 last:border-none p-4 rounded-sm shadow"
            >
              <div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-medium hover:underline"
                >
                  {repo.name}
                </a>
                <p className="text-sm text-black">
                  {repo.description || 'No description'}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm text-black font-medium min-w-[60px] justify-end">
                <span>{repo.stargazers_count}</span>
                <FaStar />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RepoList;
