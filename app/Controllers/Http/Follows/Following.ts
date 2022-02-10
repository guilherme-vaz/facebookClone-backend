import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { User } from 'App/Models'

export default class FollowingsController {
  public async index({ request, auth, response }: HttpContextContract) {
    const { username } = await request.qs()

    if (!username) {
      return response.badRequest({ error: { message: 'Missing username' } })
    }

    const user = await User.findByOrFail('username', username)

    await user.load('following')

    // Não entendi muito bem, acredito que tá mapeando todos usuários que são seguidos pelo usuário logado
    const queries = user.following.map(async (user) => {
      const isFollowing = await Database.query()
        .from('follows')
        .where('follow_id', auth.user!.id)
        .first()
    })

    await Promise.all(queries)

    return user.following
  }
}
