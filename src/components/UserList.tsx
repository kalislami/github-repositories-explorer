import { FaChevronDown } from 'react-icons/fa';
import type { GitHubUser } from '../types/github';
import RepoList from './RepoList';

interface Props {
  users: GitHubUser[];
  selectedUserId: number | null;
  setSelectedUserId: (userId: number | null) => void;
}

const UserList = ({ users, selectedUserId, setSelectedUserId }: Props) => {
  const handleSelectUser = (user: GitHubUser) => {
    setSelectedUserId(selectedUserId === user.id ? null : user.id);
  };

  return (
    <div className="mb-4 bg-white rounded-lg">
      <ul>
        {users.map((user) => {
          const isSelected = selectedUserId === user.id;

          return (
            <li key={user.id}>
              <button
                onClick={() => handleSelectUser(user)}
                className="btn-userlist"
              >
                <div className="flex items-center gap-4">
                  <p className="text-black">{user.login}</p>
                </div>

                <div
                  className={`text-md text-black transform transition-transform duration-300 ${
                    isSelected ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <FaChevronDown />
                </div>
              </button>

              {isSelected && (
                <div className="ml-7 my-2">
                  <RepoList username={user.login} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
