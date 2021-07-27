import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotionService from 'App/Services/NotionService'
import SigaaService from 'App/Services/SigaaService'

export default class TasksController {
  private sigaaService: SigaaService
  private notionService: NotionService

  constructor() {
    this.sigaaService = new SigaaService()
    this.notionService = new NotionService()
  }

  public async store({ request, response, session }: HttpContextContract) {
    const { database, secret } = request.body()

    const databaseId = database.split('/')[4].split('?v=')[0]

    console.log(databaseId)

    console.log(session.all())

    const accessToken = session.get('access_token')
    const linkId = session.get('id-vinculo')

    const activeClasses = await this.sigaaService.getClasses(accessToken, linkId, 1)

    const classesIds = activeClasses.map((activeClass) => {
      return activeClass['id-turma']
    })

    const tasksRequests = classesIds.map((classId) => {
      return this.sigaaService.getTasks(accessToken, classId)
    })

    // TODO Fix this type
    const values = (await Promise.all<TaskDTO>(tasksRequests)).flat()

    const title = values[0].titulo
    const content = values[0].conteudo
    const startDate = values[0]['data-inicio']
    const endDate = values[0]['data-entrega']

    this.notionService.configure(secret, databaseId)

    await this.notionService.addTask(title, content, startDate, endDate)

    session.flash('success', 'Tarefas inseridas com sucesso')
    return response.redirect().back()
  }
}
