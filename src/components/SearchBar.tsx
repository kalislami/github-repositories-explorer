import { useEffect, useRef, useState } from 'react';
import { useGitHubSearch } from '../hooks/useGitHubSearch';
import type { GitHubUser } from '../types/github';
import { FaSpinner } from 'react-icons/fa';

interface Props {
  onResults: (users: GitHubUser[]) => void;
  showRepo: number | null;
}

const SearchBar = ({ onResults, showRepo }: Props) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, isError } = useGitHubSearch(query);

  useEffect(() => {
    if (data) {
      onResults(data);
    } else if (query === '') {
      onResults([]);
    }
  }, [data, query, onResults]);

  const handleSearch = () => {
    const value = inputRef.current?.value.trim();
    if (value) setQuery(value);
  };

  const renderStatusMessage = () => {
    if (isError) return <ErrorMessage />;
    if (!data) return null;
    if (data.length === 0) return <StatusMessage text="No users found." />;
    if (!showRepo)
      return (
        <StatusMessage
          text={`Showing users for "${inputRef.current?.value.trim()}"`}
        />
      );
    return null;
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter username"
          className="input-search"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="btn-search"
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner aria-label="loading spinner" className="animate-spin" />
          ) : (
            'Search'
          )}
        </button>
      </div>
      {renderStatusMessage()}
    </>
  );
};

const ErrorMessage = () => (
  <div className="my-4">
    <p className="text-red">Error fetching users.</p>
  </div>
);

const StatusMessage = ({ text }: { text: string }) => (
  <div className="my-4">
    <p className="text-theme-text-3">{text}</p>
  </div>
);

export default SearchBar;
