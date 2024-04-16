/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import usersRoutes from '#routes/users'
router
  .group(() => {
    router
      .group(() => {
        usersRoutes()
      })
      .prefix('v1')
  })
  .prefix('api')
