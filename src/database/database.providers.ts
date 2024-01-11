import { Sequelize } from 'sequelize-typescript'
import * as dotenv from 'dotenv'
import { Dialect } from 'sequelize'

dotenv.config()

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: process.env.DB_DIALECT as Dialect,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      })
      sequelize.addModels([])
      try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
      } catch (error) {
        console.error('Unable to connect to the database:', error)
      }
      await sequelize.sync()
      return sequelize
    },
  },
]
