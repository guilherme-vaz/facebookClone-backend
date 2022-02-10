import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
  computed
} from '@ioc:Adonis/Lucid/Orm'
import { UserKey, File } from 'App/Models'
import Post from './Post'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  // One user has many keys
  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>

  // One user has many posts
  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  // Um usuário tem um avatar
  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where({ fileCategory: 'avatar' })
  })
  public avatar: HasOne<typeof File>

  // Seguidores
  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'following_id',
    pivotRelatedForeignKey: 'follow_id'
  })
  public followers: ManyToMany<typeof User>

  // Seguindo
  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'follow_id',
    pivotRelatedForeignKey: 'following_id'
  })
  public following: ManyToMany<typeof User>

  @computed()
  public get postsCount() {
    return this.$extras.posts_count
  }

  @computed()
  public get followersCount() {
    return this.$extras.followers_count
  }

  @computed()
  public get followingCount() {
    return this.$extras.following_count
  }

  @computed()
  public get isFollowing() {
    return this.$extras.isFollowing
  }
}
