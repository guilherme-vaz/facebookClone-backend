import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { ReactionTypes } from 'App/Utils/reactionsTypes'

export default class Reaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: ReactionTypes

  @column()
  public userId: number

  @column()
  public postId: number
}
