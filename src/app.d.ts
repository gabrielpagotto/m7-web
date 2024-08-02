// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Locals {
			user?: {
				id: string
				name: string
				email: string
				phone: string | null
				is_email_verified: boolean
				created_at: string
				updated_at: string
			};
		}
	}
}

export { };
