import { Client } from '@notionhq/client'

export default class NotionService {
  public notionDatabase: string
  private notionClient: Client

  public async configure(notionSecret: string, notionDatabase: string) {
    this.notionDatabase = notionDatabase

    this.notionClient = new Client({ auth: notionSecret })
  }

  public async addTask(title: string, content: string, startDate: number, endDate: number) {
    try {
      await this.notionClient.request({
        path: 'pages',
        method: 'post',
        body: {
          parent: { database_id: this.notionDatabase },
          properties: {
            title: {
              title: [
                {
                  text: {
                    content: title,
                  },
                },
              ],
            },
            Data: {
              date: {
                start: new Date(startDate).toISOString(),
                end: new Date(endDate).toISOString(),
              },
            },
            Description: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: content,
                  },
                },
              ],
            },
          },
        },
      })
      console.log('Success! Entry added.')
    } catch (error) {
      console.error(error.body)
    }
  }
}
