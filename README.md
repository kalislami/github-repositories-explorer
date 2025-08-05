# GitHub Repositories Explorer

A lightweight GitHub repository explorer built with **React + TypeScript**, allowing users to search GitHub usernames and explore their public repositories. Designed with clean architecture, modern UI, and best practices in state management and testing.

---

## Features

-  Search GitHub users by username
-  Display list of matching users
-  View public repositories of each user
-  Show repo description and star count
-  Smooth loading states & error handling with React Query
-  Unit and integration tests included

---

##  Tools & Tech Stack

- **React + Vite** – Fast dev build & HMR, great with TypeScript
- **TypeScript** – Strong typing for better developer experience
- **Tailwind CSS** – Utility-first styling for rapid UI development
- **TanStack Query (React Query)** – Data fetching & caching
- **Jest + React Testing Library** – Unit & integration testing
- **ESLint + Prettier** – Code quality & formatting

---

## Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx         # Search input for GitHub usernames
│   ├── UserList.tsx          # List of users and collapsible repo viewer
│   ├── RepoList.tsx          # Repo list for selected user
│
├── hooks/
│   ├── useGitHubSearch.ts    # Custom hook for searching GitHub users
│   ├── useGitHubRepos.ts     # Custom hook for fetching user repositories
│
├── styles/
│   ├── index.css             # Tailwind base styles
│   ├── components.css        # Apply custom class for components
│
├── types/
│   └── github.d.ts           # Type definitions for GitHub API responses
│
├── __tests__/                # Unit and integration tests
│
├── App.tsx                   # Root component
└── main.tsx                  # React root entry
```

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Or using Jest directly
npx jest
```

Test coverage includes:

- Unit tests for SearchBar, UserList, and RepoList
- Integration test for full search-to-repo workflow

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/kalislami/github-repositories-explorer.git
cd github-explorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

App will be available at: [http://localhost:5173/github-repositories-explorer/](http://localhost:5173/github-repositories-explorer/)

---

## Available Scripts

| Script            | Description                   |
| ----------------- | --------------------------    |
| `npm run dev`     | Start development server      |
| `npm run build`   | Build for production          |
| `npm run preview` | Preview built app locally     |
| `npm run lint`    | Run ESLint                    |
| `npm test`        | Run unit and integration tests|

---

## Notes

- GitHub API has rate limiting for unauthenticated requests.
- No personal access token is required for public search, but if needed, you can add a token for higher rate limits.

---

## License

MIT – free to use and modify.