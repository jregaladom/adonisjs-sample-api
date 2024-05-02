import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { JSONAPIErrorReporter } from '#validators/validation_custom_error'
import { uuidRule } from '#rules/uuid'

const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)

const deleteProjectValidator = vine.compile(
  vine.object({
    id: vine
      .string()
      .use(uuidRule())
      .exists(async (db, value, field) => {
        const project = await db.from('system.projects').where('id', value).first()
        return project
      }),
  })
)

createProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'El campo {{ field }} es requerido',
})

createProjectValidator.errorReporter = () => new JSONAPIErrorReporter()

deleteProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'El campo {{ field }} es requerido',
  'id.exists': 'El identificador del campo {{ field }} no existe',
})

deleteProjectValidator.errorReporter = () => new JSONAPIErrorReporter()

export { createProjectValidator, deleteProjectValidator }
