import { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import UnAuthorizedException from '#exceptions/un_authorized_exception'

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

  // /**
  //  * Delete record
  //  */
  async destroy({ params, auth }: HttpContext) {
    const user = await auth.authenticate()
    const project = await Project.findOrFail(params.id)
    if (project.userId !== user.id) {
      throw new UnAuthorizedException('', {
        status: 403,
      })
    } else {
      await project.delete()
      return {
        message: 'Project deleted successfully',
        success: true,
      }
    }
  }
}
