import { FieldContext } from '@vinejs/vine/types'
import { validate as uuidValidate } from 'uuid'
import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

type Options = {
  table: string
  column: string
}

/**
 * Implementation
 */
async function existInTable(value: ChainableContract | StrictValues, options: Options, field: FieldContext) {
  const row = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (row) {
    field.report('The {{ field }} field is not unique', 'unique', field)
  }
}

export const uuidRule = vine.createRule(existInTable)
