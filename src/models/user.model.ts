import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
} from 'sequelize-typescript'

@Table({
  modelName: 'Users',
})
export class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  id: string

  @AllowNull(false)
  @Column(DataType.STRING(255))
  firstName: string

  @AllowNull(true)
  @Column(DataType.STRING(255))
  lastName: string

  @AllowNull(false)
  @Column(DataType.STRING(255))
  email: string

  @AllowNull(false)
  @Column(DataType.STRING())
  password: string

  @AllowNull(false)
  @Default('user')
  @Column(DataType.ENUM('admin', 'user'))
  role: string
}
