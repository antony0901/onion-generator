const {
  UUID,
  DATE
} = require('sequelize');
const UniqueId = require('../../../infrastruture/helpers/unique-id');

module.exports = (sequelize) => {
  /**
   * Indicates a mapping to UserRole model.
   */
  const UserRole = sequelize.define('userrole', {
    id: {
      type: UUID,
      defaultValue: () => {
        return UniqueId.generate();
      },
      primaryKey: true
    },
    roleId: {
      type: UUID,
      allowNull: false,
    },
    userId: {
      type: UUID,
      allowNull: false,
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
  
  return UserRole;
};