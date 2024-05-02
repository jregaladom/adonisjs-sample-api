import router from '@adonisjs/core/services/router'
const TasksController = () => import('#controllers/tasks_controller')
import { middleware } from '#start/kernel'

export default function routes() {
  router
    .group(() => {
      router.get('/', [TasksController, 'index']).as('tasks.index')
      router.post('/', [TasksController, 'store']).as('tasks.store')
      router.delete('/:id', [TasksController, 'destroy']).as('tasks.destroy')
      router.patch('/:id', [TasksController, 'update']).as('tasks.update')
    })
    .prefix('tasks')
    .use(
      middleware.auth({
        guards: ['api'],
      })
    )
}
