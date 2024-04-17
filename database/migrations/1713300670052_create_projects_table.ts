import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createSchema('system')
    this.schema.withSchema('system').createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table
        .uuid('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('auth.users')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropSchema('system')
    this.schema.dropTable(this.tableName)
  }
}
