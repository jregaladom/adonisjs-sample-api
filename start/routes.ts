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
import projectsRoutes from '#routes/projects'
import taskRoutes from '#routes/task'
router
  .group(() => {
    router
      .group(() => {
        usersRoutes()
        projectsRoutes()
        taskRoutes()
      })
      .prefix('v1')
  })
  .prefix('api')
