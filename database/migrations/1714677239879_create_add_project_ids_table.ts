import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.withSchema('system').alterTable(this.tableName, (table) => {
      table
        .uuid('project_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('system.projects')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
