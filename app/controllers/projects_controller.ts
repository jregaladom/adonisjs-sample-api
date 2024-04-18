import { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const user = await auth.authenticate()
    const project = await user?.related('project').query()
    return project
  }

  // /**
  //  * Handle form submission for the create action
  //  */
  async store({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const { name } = request.only(['name'])
    const project = await user.related('project').create({
      fullName: name,
    })
    return project
  }
}
