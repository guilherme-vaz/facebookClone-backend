import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Post/Main'
import { User, Post } from 'App/Models'
import fs from 'fs'
import Application from '@ioc:Adonis/Core/Application'

export default class PostsController {
  public async index({ request, auth }: HttpContextContract) {
    // Fazendo a busca do usuário
    const { username } = request.qs()

    const user = (await User.findBy('username', username)) || auth.user!

    // Pega os posts e as informações do usuário dono do post
    await user.load('posts', (query) => {
      query.orderBy('id', 'desc')
      query.preload('media')
      query.preload('user', (query) => {
        query.select(['id', 'name', 'username'])
        query.preload('avatar')
      })

      // Contador de comentários
      query.withCount('comments')

      // Contador de likes
      query.withCount('reactions', (query) => {
        query.where('type', 'like')
        query.as('likeCount')
      })

      // Contador de loves
      query.withCount('reactions', (query) => {
        query.where('type', 'love')
        query.as('loveCount')
      })

      // Contador de haha
      query.withCount('reactions', (query) => {
        query.where('type', 'haha')
        query.as('hahaCount')
      })

      // Contador de sad
      query.withCount('reactions', (query) => {
        query.where('type', 'sad')
        query.as('sadCount')
      })

      // Contador de angry
      query.withCount('reactions', (query) => {
        query.where('type', 'angry')
        query.as('angryCount')
      })

      // posts.reaction -> []
      query.preload('reactions', () => {
        query.where('userId', auth.user!.id).first()
      })
    })

    return user.posts
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const post = await auth.user!.related('posts').create(data)

    return post
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    // Pega os dados do front-end
    const data = await request.validate(UpdateValidator)

    // Pega o post que tá sendo atualizado
    const post = await Post.findOrFail(params.id)

    // Verificando se o usuário que está fazendo a atualização é mesmo o dono do post.
    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }

    await post.merge(data).save()

    return post
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    // Encontrando o post em questão
    const post = await Post.findOrFail(params.id)

    // Verificando se o usuário é o dono do post
    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }

    // Carregando a mídia do post
    await post.load('media')

    // Retirando a media da pasta uploads e deletando do BD
    if (post.media) {
      fs.unlinkSync(Application.tmpPath('uploads', post.media.fileName))
      await post.media.delete()
    }

    // Deletando post
    await post.delete()
  }
}
