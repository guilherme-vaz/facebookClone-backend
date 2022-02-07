import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { Conversation, User } from '.'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public userId: number

  @column()
  public conversationId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Uma mensagem pertence a um usuário
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  // Uma mensagem pertence a uma conversa
  @belongsTo(() => Conversation)
  public conversation: BelongsTo<typeof Conversation>
}
