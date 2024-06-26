import router from '@adonisjs/core/services/router'
const UserController = () => import('#controllers/user_controller')
const SessionController = () => import('#controllers/session_controller')
import { middleware } from '#start/kernel'

export default function routes() {
  router
    .group(() => {
      router
        .get('/', [UserController, 'index'])
        .as('users.index')
        .use(middleware.auth({ guards: ['api'] }))
      router
        .get(':id', ({ params }) => {
          return { message: `This is post with id ${params.id}` }
        })
        .as('users.show')
        .use(middleware.auth({ guards: ['api'] }))
      router.post('/', [UserController, 'store']).as('users.store')
      router.post('/login', [SessionController, 'access']).as('users.access')
    })
    .prefix('users')
}
