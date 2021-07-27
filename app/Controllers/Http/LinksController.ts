import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SigaaService from 'App/Services/SigaaService'

export default class LinksController {
  private sigaaService: SigaaService

  constructor() {
    this.sigaaService = new SigaaService()
  }

  public async index({ view, session }: HttpContextContract) {
    const accessToken = session.get('access_token')
    const userId = 382660

    const links = await this.sigaaService.getLinks(accessToken, userId)

    return view.render('links', { links })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, session }: HttpContextContract) {
    const linkId = request.body()['id-vinculo']

    session.put('id-vinculo', linkId)

    response.redirect('/dashboard')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
