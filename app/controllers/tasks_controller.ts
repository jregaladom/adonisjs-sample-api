import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import Project from '#models/project'
import SecurityUserService from '#services/security/security_user_service'
export default class TasksController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const user = await auth.authenticate()
    const task = await user?.related('task').query().preload('project')
    return task
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const { description, projectId } = request.only(['description', 'projectId'])

    const project = await Project.find(projectId)
    await SecurityUserService.checkPermissions(user, project)
    const task = await user.related('task').create({
      description,
      projectId,
    })
    return task
  }

  /**
   * Delete record
   */
  async destroy({ params, auth }: HttpContext) {
    const user = await auth.authenticate()
    const task = await Task.find(params.id)
    await SecurityUserService.checkPermissions(user, task)
    await task?.delete()
    return {
      message: 'Task deleted successfully',
      success: true,
    }
  }

  // /**
  // * Update record
  // */
  async update({ params, request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const task = await Task.find(params.id)
    const { description } = request.only(['description'])
    await SecurityUserService.checkPermissions(user, task)
    await task?.merge({ description }).save()
    return task
  }
}
