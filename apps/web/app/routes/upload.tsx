import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getPresignedUrl = createServerFn().handler(async () => {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: 'ProspectBucket',
  })

  return getSignedUrl(new S3Client({}), command).then((url) => ({ url }))
})

export const Route = createFileRoute('/upload')({
  component: RouteComponent,
  loader: () => getPresignedUrl(),
})

function RouteComponent() {
  return (
    <div>
      <h1>Upload</h1>
      <input type="file" />
      <button>Upload</button>
    </div>
  )
}
