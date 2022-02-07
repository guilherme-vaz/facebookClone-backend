import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Conversation } from 'App/Models'

export default class ConversationsController {
  public async index({}: HttpContextContract) {}

  public async show({ response, auth, params }: HttpContextContract) {
    const conversation = await Conversation.findOrFail(params.id)

    if ([conversation.userIdOne, conversation.userIdTwo].includes(auth.user!.id)) {
      return response.unauthorized()
    }

    await conversation.load('messages')

    return conversation
  }
}
