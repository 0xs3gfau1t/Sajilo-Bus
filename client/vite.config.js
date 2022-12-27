import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "")
	console.log(env.BASE_URL)
	return defineConfig({
		plugins: [react()],
		envPrefix: "SAJILO",
		server: {
		  host: true,
			open: true,
			port: env.PORT,
			proxy: {
				"/api": {
					target: env.BASE_URL,
					changeOrigin: true,
				},
			},
		},
	})
}
