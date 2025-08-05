import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { GitHubUser } from '../types/github'

const searchUsers = async (query: string): Promise<GitHubUser[]> => {
    const response = await axios.get('https://api.github.com/search/users', {
        params: {
            q: query,
            per_page: 5,
        },
        headers: {
            Accept: 'application/vnd.github.v3+json',
        },
    })

    return response.data.items
}

export const useGitHubSearch = (query: string) => {
    return useQuery({
        queryKey: ['github-users', query],
        queryFn: () => searchUsers(query),
        enabled: query.length > 0, // only fetch if query !empty
        staleTime: 1000 * 60, // optional: cache 1m
    })
}
