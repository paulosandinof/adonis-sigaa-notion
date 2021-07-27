import { AccessTokenDTO } from 'App/Dtos/AccessTokenDTO'
import Axios, { AxiosInstance } from 'axios'

export default class SigaaService {
  private axios: AxiosInstance

  constructor() {
    this.axios = Axios.create({
      baseURL: process.env.SIGAA_API_URI,
      headers: {
        'X-API-KEY': process.env.SIGAA_X_API_KEY,
      },
    })
  }

  public async getAccessToken(code: string): Promise<AccessTokenDTO> {
    const url =
      `${process.env.SIGAA_AUTH_URI}/authz-server/oauth/token?` +
      `client_id=${process.env.SIGAA_CLIENT_ID}&` +
      `client_secret=${process.env.SIGAA_CLIENT_SECRET}&` +
      `redirect_uri=${process.env.CALLBACK_URI}&` +
      `grant_type=authorization_code&` +
      `code=${code}`

    const { data } = await this.axios.post<AccessTokenDTO>(url)

    return data
  }

  // TODO Missing types
  public async getLinks(accessToken: string, userId: number) {
    const { data } = await this.axios.get('/vinculo/v1/vinculos', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        'id-usuario': userId,
      },
    })

    return data
  }

  // TODO Missing types
  public async getClasses(accessToken: string, studentId: number, classStatus: number) {
    const { data } = await this.axios.get('/turma/v1/turmas', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        'id-discente': studentId,
        'id-situacao-turma': classStatus,
      },
    })

    return data
  }

  // TODO Missing types and retrieve only active tasks
  public async getTasks(accessToken: string, classId: number) {
    const { data } = await this.axios.get('/turma/v1/tarefas', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        'id-turma': classId,
      },
    })

    return data
  }
}
