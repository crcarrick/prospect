import { defineConfig } from '@tanstack/react-start/config'

const config: ReturnType<typeof defineConfig> = defineConfig({
  server: {
    preset: 'aws-lambda',
    awsLambda: {
      streaming: true,
    },
  },
})

export default config
