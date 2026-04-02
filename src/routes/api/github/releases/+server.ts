import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

let cache: { version: string | null; timestamp: number } | null = null;
const CACHE_TTL = 60 * 1000;

export const GET: RequestHandler = async () => {
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
        return json({ version: cache.version });
    }

    const response = await fetch('https://api.github.com/repos/pimatis/mavetis/releases/latest');

    if (!response.ok) {
        return json({ version: cache?.version ?? null });
    }

    const data = await response.json();
    const version = data.tag_name ?? null;

    cache = { version, timestamp: Date.now() };

    return json({ version });
};
