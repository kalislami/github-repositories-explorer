export interface GitHubUser {
    login: string
    id: number
}

export interface GitHubRepo {
    id: number
    name: string
    html_url: string
    description: string | null
    stargazers_count: number
}
