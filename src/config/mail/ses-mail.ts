import nodemailer from 'nodemailer'
import { HandlebarsMailTemplate } from './handlebars-mail-template'
import { SES } from '@aws-sdk/client-ses'
import { mailConfig } from './mail'

type ITemplateVariable = Record<string, string | number>

export interface IParserMailTemplate {
  file: string
  variables: ITemplateVariable
}

interface IMailContact {
  name: string
  email: string
}

interface ISendMail {
  from?: IMailContact
  to: IMailContact
  subject: string
  templateData: IParserMailTemplate
}

export default class SESMail {
  static async sendMail ({ from, to, subject, templateData }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate()
    const transporter = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01'
      })
    })
    const { email, name } = mailConfig.defaults.from
    await transporter.sendMail({
      from: {
        name: from?.name ?? name,
        address: from?.email ?? email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parser(templateData)
    })
  }
}
