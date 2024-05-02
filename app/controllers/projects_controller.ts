import { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import SecurityUserService from '#services/security/security_user_service'
import { createProjectValidator } from '#validators/project_validator'

export default class ProjectsController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const user = await auth.authenticate()
    const project = await user?.related('project').query()
    return project
  }

  async taskProject({ auth, params }: HttpContext) {
    const user = await auth.authenticate()
    const project = await user?.related('project').query().where('id', params.id).preload('task')
    await SecurityUserService.checkPermissions(user, project)
    return project
  }

  // /**
  //  * Handle form submission for the create action
  //  */
  async store({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const { name } = request.only(['name'])
    const payload = await createProjectValidator.validate({ name })
    console.log(payload)
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

  // /**
  // * Update record
  // */
  async update({ params, request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const project = await Project.find(params.id)
    const { name } = request.only(['name'])
    await SecurityUserService.checkPermissions(user, project)
    await project?.merge({ fullName: name }).save()
    return project
  }
}
