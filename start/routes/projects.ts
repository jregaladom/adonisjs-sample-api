import router from '@adonisjs/core/services/router'
const ProjectsController = () => import('#controllers/projects_controller')
import { middleware } from '#start/kernel'

export default function routes() {
  router
    .group(() => {
      router.get('/', [ProjectsController, 'index']).as('projects.index')
      router.post('/', [ProjectsController, 'store']).as('projects.store')
      router.delete('/:id', [ProjectsController, 'destroy']).as('projects.destroy')
      router.patch('/:id', [ProjectsController, 'update']).as('projects.update')
      router.get('/:id', [ProjectsController, 'taskProject']).as('projects.index.taskProject')
    })
    .prefix('projects')
    .use(
      middleware.auth({
        guards: ['api'],
      })
    )
}
