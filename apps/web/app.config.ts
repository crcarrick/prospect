import { defineConfig } from '@tanstack/react-start/config'

const config: ReturnType<typeof defineConfig> = defineConfig({
  server: {
    preset: 'netlify',
  },
})

export default config
