import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user_validator'

export default class UserController {
  /**
   * Display a list of resource
   */
  async index() {
    const users = await User.all()
    return users
  }

  // /**
  //  * Display form to create a new record
  //  */
  // async create({ }: HttpContext) { }

  // /**
  //  * Handle form submission for the create action
  //  */
  async store({ request }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])
    const payload = await createUserValidator.validate({ email, password, fullName })
    const user = await User.create(payload)
    return user
  }

  // /**
  //  * Show individual record
  //  */
  // async show({ params }: HttpContext) { }

  // /**
  //  * Edit individual record
  //  */
  // async edit({ params }: HttpContext) { }

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) { }

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) { }
}
