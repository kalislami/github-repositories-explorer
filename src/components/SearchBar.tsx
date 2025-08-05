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
  const { data, isLoading, isError } = useGitHubSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data) {
      onResults(data);
    } else if (query.length === 0) {
      onResults([]);
    }
  }, [data, query, onResults]);

  const handleSearch = () => {
    const value = inputRef.current?.value.trim() || null;
    if (value) setQuery(value);
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter username"
          className="input-search"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="btn-search"
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner aria-label="loading spinner" className="animate-spin" /> : 'Search'}
        </button>
      </div>
      {isError && (
        <div className="my-4">
          <p className="text-red">Error fetching users.</p>
        </div>
      )}
      {data &&
        (data.length > 0 ? (
          !showRepo && (
            <div className="my-4">
              <p className="text-gray-500">
                Showing users for "{inputRef.current?.value.trim()}"
              </p>
            </div>
          )
        ) : (
          <div className="my-4">
            <p className="text-gray-500">No users found.</p>
          </div>
        ))}
    </>
  );
};

export default SearchBar;
