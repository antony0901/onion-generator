const {
  UUID,
  STRING,
  BOOLEAN,
  DATE
} = require('sequelize');
const UniqueId = require('../../../infrastruture/helpers/unique-id');

module.exports = (sequelize) => {
  const Role = sequelize.define('role', {
    id: {
      type: UUID,
      defaultValue: () => {
        return UniqueId.generate();
      },
      primaryKey: true
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
      allowNull: true,
    },
    createdAt: {
      type: DATE,
      defaultValue: () => {
        return new Date();
      },
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      defaultValue: () => {
        return new Date();
      },
      allowNull: true,
    },
  });

  return Role;
};