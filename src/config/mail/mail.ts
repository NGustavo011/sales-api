import env from '@config/env'

type IMailDriverOptions = 'ethereal' | 'ses'

interface IMailConfig {
  driver: IMailDriverOptions
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export const mailConfig: IMailConfig = {
  driver: env.mailDriver as IMailDriverOptions,
  defaults: {
    from: {
      email: 'team@salesapi.com.br',
      name: 'Team SALES-API'
    }
  }
}
