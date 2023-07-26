import { uploadConfig } from '@config/upload'
import fs from 'fs'
import path from 'path'
import { S3 } from '@aws-sdk/client-s3'
import env from '@config/env'
import mime from 'mime'

export class S3StorageProvider {
  private readonly client: S3

  constructor () {
    this.client = new S3({
      region: env.awsRegion
    })
  }

  public async saveFile (file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)
    const contentType = mime.getType(originalPath)
    if (!contentType) { throw new Error('File not found') }
    const fileContent = await fs.promises.readFile(originalPath)
    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: contentType
    })
    await fs.promises.unlink(originalPath)
    return file
  }

  public async deleteFile (file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file
    })
  }
}
