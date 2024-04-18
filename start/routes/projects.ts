import router from '@adonisjs/core/services/router'
const ProjectsController = () => import('#controllers/projects_controller')
import { middleware } from '#start/kernel'

export default function routes() {
  router
    .group(() => {
      router.get('/', [ProjectsController, 'index']).as('projects.index')
      router.post('/', [ProjectsController, 'store']).as('projects.store')
    })
    .prefix('projects')
    .use(
      middleware.auth({
        guards: ['api'],
      })
    )
}
