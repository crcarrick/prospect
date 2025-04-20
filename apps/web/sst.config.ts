/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app() {
    return {
      name: 'web',
      home: 'aws',
    }
  },
  async run() {
    const bucket = new sst.aws.Bucket('ProspectBucket', {
      access: 'public',
      cors: {
        allowMethods: ['PUT'],
      },
    })

    return {
      bucket: bucket.name,
    }
  },
})
