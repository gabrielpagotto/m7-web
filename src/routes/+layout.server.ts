import { type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, fetch }) => {
    const response = await fetch('/m7-api/users/me');
    if (response.status === 200) {
        locals.user = await response.json();
    }
    return { user: locals.user };
};

