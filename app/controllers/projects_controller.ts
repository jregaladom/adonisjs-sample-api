import { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import SecurityUserService from '#services/security/security_user_service'

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
    const project = await Project.find(params.id)
    await SecurityUserService.checkPermissions(user, project)
    await project?.delete()
    return {
      message: 'Project deleted successfully',
      success: true,
    }
  }
}
