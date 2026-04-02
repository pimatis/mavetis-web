import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

let cache: { stars: number; timestamp: number } | null = null;
const CACHE_TTL = 60 * 1000;

export const GET: RequestHandler = async () => {
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
        return json({ stars: cache.stars });
    }

    const response = await fetch('https://api.github.com/repos/pimatis/mavetis');

    if (!response.ok) {
        return json({ stars: cache?.stars ?? 0 });
    }

    const data = await response.json();
    const stars = data.stargazers_count ?? 0;

    cache = { stars, timestamp: Date.now() };

    return json({ stars });
};
