import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors } from '@adonisjs/auth'
import UnAuthorizedException from '#exceptions/un_authorized_exception'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    console.log(error)
    if (error instanceof errors.E_INVALID_CREDENTIALS && ctx.route?.name === 'users.access') {
      console.log(ctx)
      throw new UnAuthorizedException('', {
        status: error.status,
      })
    } else if (error instanceof errors.E_UNAUTHORIZED_ACCESS) {
      throw new UnAuthorizedException('', {
        status: error.status,
      })
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
