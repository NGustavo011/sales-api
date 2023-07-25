import handlebars from 'handlebars'
import { type IParserMailTemplate } from './ethereal-mail'
import fs from 'fs'

export class HandlebarsMailTemplate {
  public async parser ({ file, variables }: IParserMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })
    const parserTemplate = handlebars.compile(templateFileContent)
    return parserTemplate(variables)
  }
}
