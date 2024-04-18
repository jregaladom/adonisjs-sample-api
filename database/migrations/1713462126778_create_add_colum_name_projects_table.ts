import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.withSchema('system').alterTable(this.tableName, (table) => {
      table.string('full_name').nullable()
    })
  }

  async down() {
    this.schema.withSchema('system').alterTable(this.tableName, (table) => {
      table.dropColumn('full_name')
    })
  }
}
