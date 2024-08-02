import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import cookie from 'cookie';

dotenv.config();

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/m7-api': {
				target: process.env.PRIVATE_M7_API_HOST,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/m7-api/, ''),
				headers: {
					'Content-Type': 'application/json',
				},
				configure: (proxy, _) => {
					proxy.on('proxyReq', (proxy, req, _) => {
						const cookies = cookie.parse(req.headers.cookie || '');
						const token = cookies['m7:access_token'];
						
						// Set bearer token in the header.
						if (token) proxy.setHeader('Authorization', `Bearer ${token}`);
					});
				}
			}
		}
	}
});
