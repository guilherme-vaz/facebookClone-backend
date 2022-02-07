import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { Message, User } from '.'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userIdOne: number

  @column()
  public userIdTwo: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Uma conversa tem muitas mensagens
  @hasMany(() => Message)
  public messages: HasMany<typeof Message>

  // Uma conversa pertence a dois usuários
  @belongsTo(() => User, { foreignKey: 'userIdOne' })
  public userOne: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'userIdtwo' })
  public userTwo: BelongsTo<typeof User>
}
