import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, beforeCreate, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { v4 as uuidv4 } from 'uuid'
import Project from '#models/project'
import Task from '#models/task'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static table = 'auth.users'

  @hasMany(() => Project, {
    foreignKey: 'userId',
  })
  declare project: HasMany<typeof Project>

  @hasMany(() => Task, {
    foreignKey: 'userId',
  })
  declare task: HasMany<typeof Task>

  @beforeCreate()
  static async setID(user: User) {
    user.id = uuidv4()
  }

  @column({ isPrimary: true, serializeAs: null })
  declare id: string

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'yhu_',
    table: 'auth.auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
