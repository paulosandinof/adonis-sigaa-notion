import Axios from 'axios'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
  public async index({ view, session }: HttpContextContract) {
    const url = `https://api.info.ufrn.br/turma/v1/tarefas`

    console.log(session.get('access_token'))

    return view.render('dashboard')
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
