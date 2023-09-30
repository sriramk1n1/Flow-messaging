import { redirect } from '@sveltejs/kit';

export const load = async({ request, cookies }) => {
	if (!cookies.get("access")) {
		throw redirect(307, '/login');
	}      
}
