import { type ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: ServerLoad = async ({ parent, locals }) => {
    await parent();
    if (locals.user) {
        throw redirect(302, '/dashboard');
    }
    return {};
};