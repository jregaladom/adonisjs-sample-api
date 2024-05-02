import { FieldContext } from '@vinejs/vine/types'
import { validate as uuidValidate } from 'uuid'
import vine from '@vinejs/vine'
/**
 * Implementation
 */
async function uuid(value: unknown) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle the
   * the validation.
   */
  if (typeof value !== 'string') {
    return
  }

  if (!uuidValidate(value)) {
    //field.report('The {{ field }} field is not a valid UUID', 'uuid', field)
    return 'The {{ field }} field is not a valid UUID'
  }
}

export const uuidRule = vine.createRule(uuid)
