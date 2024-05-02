import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { JSONAPIErrorReporter } from '#validators/validation_custom_error'
const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)

createProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'El campo {{ field }} es requerido',
})

createProjectValidator.errorReporter = () => new JSONAPIErrorReporter()

export { createProjectValidator }
