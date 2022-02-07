import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Follows extends BaseSchema {
  protected tableName = 'follows'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //Id do usuário que está seguindo
      table
        .integer('follow_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      // Id do usuário que está sendo seguido
      table
        .integer('following_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
