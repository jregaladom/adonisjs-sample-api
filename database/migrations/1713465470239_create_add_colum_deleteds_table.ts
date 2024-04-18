import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.withSchema('system').alterTable(this.tableName, (table) => {
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.withSchema('system').alterTable(this.tableName, (table) => {
      table.dropColumn('deleted_at')
    })
  }
}
