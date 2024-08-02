import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ cookies }: RequestEvent) {
    cookies.delete('m7:access_token', { path: '/' });
    cookies.delete('m7:refresh_token', { path: '/ ' });
    return new Response(JSON.stringify({ 'logged': false }), { headers: { 'Content-Type': 'application/json' } });
}