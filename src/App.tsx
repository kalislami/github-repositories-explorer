import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import type { GitHubUser } from './types/github';

function App() {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-10">
      <div className="max-w-3xl mx-auto">
        <SearchBar onResults={setUsers} showRepo={selectedUserId} />

        {users.length > 0 && (
          <UserList
            users={users}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />
        )}
      </div>
    </div>
  );
}

export default App;
