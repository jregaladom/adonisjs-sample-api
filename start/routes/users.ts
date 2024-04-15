import router from '@adonisjs/core/services/router'
const UserController = () => import('#controllers/user_controller')

export default function routes() {
  router
    .group(() => {
      router.get('/', async () => {
        return {
          message: 'get users',
        }
      })
      router
        .get(':id', ({ params }) => {
          return { message: `This is post with id ${params.id}` }
        })
        .as('users.index')
      router.post('/', [UserController, 'store']).as('users.store')
    })
    .prefix('users')
}
