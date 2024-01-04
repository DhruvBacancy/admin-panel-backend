const Sequelize = require("sequelize")
const sequelize = require("../config/sequelize-dbconnect")

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
  })
}
