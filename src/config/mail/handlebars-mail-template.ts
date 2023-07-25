import handlebars from 'handlebars'
import { type IParserMailTemplate } from './ethereal-mail'

export class HandlebarsMailTemplate {
  public async parser ({ template, variables }: IParserMailTemplate): Promise<string> {
    const parserTemplate = handlebars.compile(template)
    return parserTemplate(variables)
  }
}
