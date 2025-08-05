import { FaChevronDown } from 'react-icons/fa';
import type { GitHubUser } from '../types/github';
import RepoList from './RepoList';

interface Props {
  users: GitHubUser[];
  selectedUserId: number | null;
  setSelectedUserId: (userId: number | null) => void;
}

const UserList = ({ users, selectedUserId, setSelectedUserId }: Props) => (
  <div className="mb-4 bg-white rounded-lg">
    <ul>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          isSelected={selectedUserId === user.id}
          onSelect={() =>
            setSelectedUserId(selectedUserId === user.id ? null : user.id)
          }
        />
      ))}
    </ul>
  </div>
);

interface UserItemProps {
  user: GitHubUser;
  isSelected: boolean;
  onSelect: () => void;
}

const UserItem = ({ user, isSelected, onSelect }: UserItemProps) => (
  <li>
    <button onClick={onSelect} className="btn-userlist">
      <div className="flex items-center gap-4">
        <p className="text-theme-text-1">{user.login}</p>
      </div>
      <div
        className={`text-md text-theme-text-1 transform transition-transform duration-300 ${
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

export default UserList;
