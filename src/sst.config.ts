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

    new sst.aws.TanStackStart('ProspectWeb', {
      link: [bucket],
    })

    return {
      bucket: bucket.name,
    }
  },
})
