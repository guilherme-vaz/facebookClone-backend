import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { reactionsTypes } from 'App/Utils/reactionsTypes'

export default class Reactions extends BaseSchema {
  protected tableName = 'reactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('type', reactionsTypes)
      // Uma reação pertence a um usuário
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      // Uma reação também pertence a um post
      table
        .integer('post_id')
        .unsigned()
        .references('posts.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
