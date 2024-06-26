import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Task from '#models/task'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { compose } from '@adonisjs/core/helpers'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Project extends compose(BaseModel, SoftDeletes) {
  static table = 'system.projects'

  @column({ isPrimary: true, serializeAs: null })
  declare id: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime

  @column({ serializeAs: null })
  declare userId: string | null

  @column()
  declare fullName: string | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Task, {
    foreignKey: 'projectId',
  })
  declare task: HasMany<typeof Task>
}
