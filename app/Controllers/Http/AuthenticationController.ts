import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SigaaService from 'App/Services/SigaaService'

export default class AuthenticationController {
  private sigaaService: SigaaService

  constructor() {
    this.sigaaService = new SigaaService()
  }

  public async index({ view }: HttpContextContract) {
    const url =
      `${process.env.SIGAA_AUTH_URI}/authz-server/oauth/authorize?` +
      `client_id=${process.env.SIGAA_CLIENT_ID}&` +
      `response_type=code&` +
      `redirect_uri=${process.env.CALLBACK_URI}`

    return view.render('welcome', {
      url,
    })
  }

  public async create({ request, response, session }: HttpContextContract) {
    const code = request.qs()['code']

    const data = await this.sigaaService.getAccessToken(code)

    Object.keys(data).forEach((entry) => {
      session.put(entry, data[entry])
    })

    return response.redirect('/links')
  }

  // public async store({}: HttpContextContract) {}

  // public async show({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}

  // public async update({}: HttpContextContract) {}

  // public async destroy({}: HttpContextContract) {}
}
