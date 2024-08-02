import type { UserResponse } from '$lib/types/apiResponses';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request, fetch, cookies, locals }: RequestEvent) {
    const data = await request.json();
    const headers = { 'Content-Type': 'application/json' };
    const accessToken = data['access_token'];
    const refreshToken = data['refresh_token'];

    if (!accessToken || !refreshToken) {
        return new Response(JSON.stringify({ 'details': 'Could not validate credentials.' }), { status: 401, headers });
    }

    cookies.set('m7:access_token', accessToken as string, { path: '/' });
    cookies.set('m7:refresh_token', refreshToken, { path: '/' });
    const authCheckResponse = await fetch('/m7-api/users/me');

    if (authCheckResponse.status !== 200) {
        cookies.delete('m7:access_token', { path: '/' });
        cookies.delete('m7:refresh_token', { path: '/ ' });
        return new Response(JSON.stringify({ 'details': 'Could not validate credentials.' }), { status: 401, headers });
    }
    locals.user = await authCheckResponse.json() satisfies UserResponse;
    return new Response(JSON.stringify({ 'logged': true }), { headers });
}