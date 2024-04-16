import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UnAuthorizedException extends Exception {
  async handle(error: this, ctx: HttpContext) {
    if (error.status === 400) {
      return ctx.response.status(error.status).send({ message: 'Credenciales incorrectas.' })
    } else if (error.status === 401) {
      return ctx.response.status(error.status).send({ message: 'Sin autorización.' })
    }
  }
}
