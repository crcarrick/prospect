import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Resource } from 'sst'

const getPresignedUrl = createServerFn().handler(async () => {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.ProspectBucket.name,
  })

  return getSignedUrl(new S3Client({}), command).then((url) => ({ url }))
})

const testVisionary = createServerFn().handler(async () => {
  const response = await fetch(Resource.ProspectVisionary.url)
  const text = await response.text()

  return { text }
})

export const Route = createFileRoute('/upload')({
  component: RouteComponent,
  loader: async () => ({
    visionary: await testVisionary(),
    presignedUrl: await getPresignedUrl(),
  }),
})

function RouteComponent() {
  const { visionary, presignedUrl } = Route.useLoaderData()

  console.log(visionary, presignedUrl)

  return (
    <div>
      <h1>Upload</h1>
      <input type="file" />
      <button>Upload</button>
    </div>
  )
}
