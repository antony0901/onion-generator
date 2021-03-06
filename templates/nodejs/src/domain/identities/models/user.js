const {
  UUID,
  STRING,
  BOOLEAN,
  DATE
} = require('sequelize');
const UniqueId = require('../../../infrastruture/helpers/unique-id');
const _ = require('lodash');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: UUID,
      defaultValue: () => {
        return UniqueId.generate();
      },
      primaryKey: true
    },
    name: {
      type: STRING,
      allowNull: true,
    },
    email: {
      type: STRING,
      allowNull: true
    },
    password: {
      type: STRING,
      allowNull: true
    },
    loginProvider: {
      type: STRING,
      allowNull: true,
    },
    loginKey: {
      type: STRING,
      allowNull: true,
    },
    isExternalUser: {
      type: BOOLEAN,
      allowNull: false
    },
    leadStatus: {
      type: STRING,
      allowNull: true
    },
    isActive: {
      type: BOOLEAN,
      allowNull: true
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

  return User;
};
