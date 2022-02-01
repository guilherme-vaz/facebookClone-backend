import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User, UserKey } from 'App/Models'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPassword'
import faker from 'faker'

export default class ForgotPasswordController {
  public async store({ request }: HttpContextContract) {
    // Do front-end pegamos isso
    const { email, redirectUrl } = await request.validate(StoreValidator)

    // Precisamos encontrar o usuário que quer mudar a senha
    const user = await User.findByOrFail('email', email)

    // Com o usuário encontrado criamos uma chave para o link que ele vai acessar
    const key = faker.datatype.uuid() + user.id

    // Fazemos o relacionamento entre o usuário e a chave criada
    await user.related('keys').create({ key })

    // Criamos o link
    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

    // Enviamos o email
    await Mail.send((message) => {
      message.to(email)
      message.from('contato@facebook.com', 'Facebook')
      message.subject('Recuperação de senha')
      message.htmlView('emails/forgot_password', { link })
    })
  }

  public async show({ params }: HttpContextContract) {
    await UserKey.findByOrFail('key', params.key)
  }

  public async update({ request }: HttpContextContract) {
    // O front-end vai fornecer isso
    const { key, password } = await request.validate(UpdateValidator)

    // Encontramos a chave do usuário no banco de dados.
    const userKey = await UserKey.findByOrFail('key', key)

    // Carregamos o usuário
    userKey.load('user')

    // Atualizamos a nova senha do usuário
    userKey.user.merge({ password })

    // Salvamos o usuário com as novas informações
    await userKey.user.save()

    // Destruímos a chave
    await userKey.delete()

    // Retornamos uma mensagem pro front-end
    return { message: 'password changed successfully' }
  }
}
