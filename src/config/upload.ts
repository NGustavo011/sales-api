import multer, { type StorageEngine } from 'multer'
import path from 'path'
import crypto from 'crypto'
import env from './env'

type IStorageDriver = 's3' | 'disk'

interface IUploadConfig {
  driver: IStorageDriver
  tmpFolder: string
  directory: string
  multer: {
    storage: StorageEngine
  }
  config: {
    aws: {
      bucket: string
    }
  }
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp')
export const uploadConfig: IUploadConfig = {
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename (request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`
        callback(null, fileName)
      }
    })
  },
  config: {
    aws: {
      bucket: 'api-vendas'
    }
  },
  driver: env.storageDriver as IStorageDriver
}
