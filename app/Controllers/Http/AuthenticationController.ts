import Axios from 'axios'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

interface AxiosResponse {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
}

export default class AuthenticationController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response, session }: HttpContextContract) {
    const code = request.qs()['code']

    const url =
      `${process.env.SIGAA_AUTH_URI}/authz-server/oauth/token?` +
      `client_id=${process.env.SIGAA_CLIENT_ID}&` +
      `client_secret=${process.env.SIGAA_CLIENT_SECRET}&` +
      `redirect_uri=${process.env.CALLBACK_URI}&` +
      `grant_type=authorization_code&` +
      `code=${code}`

    const { data } = await Axios.post<AxiosResponse>(url)

    Object.keys(data).forEach((entry) => {
      session.put(entry, data[entry])
    })

    return response.redirect().toRoute('DashboardController.index')
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
