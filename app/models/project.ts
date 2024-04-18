import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { compose } from '@adonisjs/core/helpers'
export default class Project extends compose(BaseModel, SoftDeletes) {
  static table = 'system.projects'

  @column({ isPrimary: true, serializeAs: null })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime

  @column({ serializeAs: null })
  declare userId: string | null

  @column()
  declare fullName: string | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
