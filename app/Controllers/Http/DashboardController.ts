import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SigaaService from 'App/Services/SigaaService'

export default class DashboardController {
  private sigaaService: SigaaService

  constructor() {
    this.sigaaService = new SigaaService()
  }

  public async index({ view, session }: HttpContextContract) {
    console.log(session.all())

    return view.render('dashboard')
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
