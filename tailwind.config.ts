import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'theme-blue': '#2d9cdb',
                'theme-gray': {
                    1: '#f2f2f2',
                    2: '#e0e0e0',
                    3: '#e1e1e1',
                },
                'theme-text': {
                    1: '#000000',
                    2: '#333333',
                    3: '#888888',
                    4: '#eaeef0',
                },
            },
        },
    },
    plugins: [],
}
export default config
