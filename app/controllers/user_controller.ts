import type { HttpContext } from '@adonisjs/core/http'
import User from 'App/Models/User'

export default class UserController {
  // /**
  //  * Display a list of resource
  //  */
  // async index({ }: HttpContext) { }

  // /**
  //  * Display form to create a new record
  //  */
  // async create({ }: HttpContext) { }

  // /**
  //  * Handle form submission for the create action
  //  */
  async store({ request }: HttpContext) {
    const { email, password, fullName } = request.all()
    const user = await User.create({
      fullName,
      email,
      password,
    })

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
