import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { JSONAPIErrorReporter } from '#validators/validation_custom_error'
import { uniqueRule } from '#rules/unique'

const createUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .use(uniqueRule({ table: 'auth.users', column: 'email' })),
    password: vine.string(),
    fullName: vine.string(),
  })
)

createUserValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'El campo {{ field }} es requerido',
  'email.email': 'El campo {{ field }} no es un valor correcto',
  'email.unique': 'Ya existe el valor de {{ field }}',
  'password.required': 'El campo {{ field }} es requerido',
  'fullName.required': 'El campo {{ field }} es requerido',
})

createUserValidator.errorReporter = () => new JSONAPIErrorReporter()

export { createUserValidator }
