import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { GitHubRepo } from '../types/github'

const fetchRepos = async (username: string): Promise<GitHubRepo[]> => {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
        },
    })

    return response.data
}

export const useGitHubRepos = (username: string) => {
    return useQuery({
        queryKey: ['github-repos', username],
        queryFn: () => fetchRepos(username),
        enabled: !!username, // only active if there's username
        staleTime: 1000 * 60, // optional: cache 1m
    })
}
