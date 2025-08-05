import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserList from '../components/UserList';
import { mockUsers } from './mocks/mockData';

jest.mock('../components/RepoList', () => () => (
  <div data-testid="repo-list">RepoList Component</div>
));

describe('UserList component', () => {
  const setSelectedUserId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all users', () => {
    render(
      <UserList
        users={mockUsers}
        selectedUserId={null}
        setSelectedUserId={setSelectedUserId}
      />
    );

    for (const { login } of mockUsers) {
      expect(screen.getByText(login)).toBeInTheDocument();
    }
  });

  it('should call setSelectedUserId with user id when user is clicked', () => {
    render(
      <UserList
        users={mockUsers}
        selectedUserId={null}
        setSelectedUserId={setSelectedUserId}
      />
    );

    for (const { login } of mockUsers) {
      const button = screen.getByText(login).closest('button')!;
      fireEvent.click(button);

      expect(setSelectedUserId).toHaveBeenCalledWith(1);
    }
  });

  it('should deselect user if same user is clicked again', () => {
    const { login, id } = mockUsers[0];

    render(
      <UserList
        users={mockUsers}
        selectedUserId={id}
        setSelectedUserId={setSelectedUserId}
      />
    );

    const button = screen.getByText(login).closest('button')!;
    fireEvent.click(button);

    expect(setSelectedUserId).toHaveBeenCalledWith(null);
  });

  it('should show RepoList when a user is selected', () => {
    render(
      <UserList
        users={mockUsers}
        selectedUserId={2}
        setSelectedUserId={setSelectedUserId}
      />
    );

    expect(screen.getByTestId('repo-list')).toBeInTheDocument();
  });

  it('should rotate the chevron icon when user is selected', () => {
    const { container } = render(
      <UserList
        users={mockUsers}
        selectedUserId={1}
        setSelectedUserId={setSelectedUserId}
      />
    );

    const rotateDiv = container.querySelector('.rotate-180');
    expect(rotateDiv).toBeInTheDocument();
  });

  it('should not render RepoList for unselected users', () => {
    render(
      <UserList
        users={mockUsers}
        selectedUserId={null}
        setSelectedUserId={setSelectedUserId}
      />
    );

    expect(screen.queryByTestId('repo-list')).not.toBeInTheDocument();
  });
});
