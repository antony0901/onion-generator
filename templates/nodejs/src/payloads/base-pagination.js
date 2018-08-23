const t = require('tcomb');

const BasePagination = t.struct({
  pageSize: t.Integer,
  pageNumber: t.Integer,
  orderBy: t.maybe(t.String)
});

const PaginationResult = t.struct({
  numbersOfPage: t.Integer,
  data: t.Any
});

module.exports = {
  BasePagination,
  PaginationResult
};