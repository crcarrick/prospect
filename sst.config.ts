/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'web',
      home: 'aws',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
    }
  },
  async run() {
    const bucket = new sst.aws.Bucket('ProspectBucket', {
      access: 'public',
      cors: {
        allowMethods: ['PUT'],
      },
    })

    const cluster = new sst.aws.Cluster('ProspectCluster', {
      vpc: new sst.aws.Vpc('ProspectVpc', {
        bastion: true,
        nat: 'managed',
      }),
    })

    new sst.aws.Service('ProspectVisionary', {
      cluster,
      link: [bucket],
      dev: {
        command: 'pnpm dev:vis',
      },
      image: {
        context: './visionary',
        dockerfile: 'Dockerfile',
      },
      environment: {
        VISIONARY_BUCKET_NAME: bucket.name,
      },
      loadBalancer: {
        ports: [{ listen: '80/http', forward: '8000/http' }],
      },
    })

    new sst.aws.TanStackStart('ProspectWeb', {
      link: [bucket],
      dev: {
        command: 'pnpm dev:web',
      },
    })

    return {
      bucket: bucket.name,
    }
  },
})
