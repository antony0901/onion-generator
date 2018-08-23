const { forIn, has } = require('lodash');

class Mapper {
  static toModel(entity, model) {
    forIn(entity.dataValues, (value, key) => {
      if (has(model, key)) {
        model[key] = value;
      }
    });

    return model;
  }
}

module.exports = Mapper;
