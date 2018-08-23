const _ = require('lodash');

class BaseRepository {
  constructor(entity, transaction) {
    this.entity = entity;
    this.transaction = transaction;
  }

  count(predicate) {
    if (predicate) {
      return this.entity.count(predicate).then((c) => {
        return c;
      }).catch((e) => {
        throw new Error(e);
      });
    }

    return this.entity.count().then((c) => {
      return c;
    }).catch((e) => {
      throw new Error(e);
    });
  }

  getAll(
    pageSize = 100000,
    pageNumber = 1
  ) {
    const limit = pageSize;
    const offset = (pageNumber - 1) * limit;
    return this.entity.findAll({
      limit: limit,
      offset: offset
    }).then((rs) => {
      const models = rs.map(r => r.toModel());
      return models;
    }).catch((e) => {
      throw new Error(e);
    });
  }

  /**
   * Returns an collection of entities which match the predicate given.
   * @param {*} predicate 
   */
  findBy(predicate, pageSize = 10000, pageNumber = 1) {
    const limit = pageSize;
    const offset = (pageNumber - 1) * limit;
    return this.entity.findAll({
      where: predicate,
      limit: limit,
      offset: offset
    }).then(rs => {
      if (_.isEmpty(rs)) {
        return rs;
      } else {
        const models = _.map(rs, r => r.toModel());
        return models;
      }
    }).catch((e) => {
      throw new Error(e);
    });
  }

  /**
   * Returns an entity which match the predicate given.
   * @param {*} predicate 
   */
  findOne(predicate) {
    return this.entity.findOne({
      where: predicate
    }).then((rs) => {
      if (_.isEmpty(rs)) {
        return rs;
      } else {
        const model = rs.toModel();
        return model;
      }
    }).catch((e) => {
      throw new Error(e);
    });
  }

  findById(id) {
    return this.entity.findById(id).then(rs => {
      if (_.isEmpty(rs)) {
        return rs;
      } else {
        const model = rs.toModel();
        return model;
      }
    }).catch((e) => {
      throw new Error(e);
    });
  }

  add(model) {
    const newEntity = _.omitBy(model, _.isUndefined);
    return this.entity.create(newEntity, {
      transaction: this.transaction
    });
  }

  update(model, predicate) {
    const updatedEntity = _.omitBy(model, _.isUndefined);
    return this.entity.update(updatedEntity, {
      where: predicate,
      individualHooks: true
    }, {
      transaction: this.transaction
    }).catch((e) => {
      throw new Error(e);
    });
  }

  upsert(model) {
    const newEntity = _.omitBy(model, _.isUndefined);
    return this.entity.upsert(newEntity, {
      transaction: this.transaction
    });
  }

  delete(id) {
    return this.entity.delete(id);
  }
}

module.exports = BaseRepository;