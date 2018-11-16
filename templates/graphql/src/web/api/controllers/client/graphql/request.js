const {
  graphql
} = require('graphql');
const schema = require('./schema');

module.exports = async function (req, res) {
  const body = req.body;
  graphql(schema, body['query']).then(rs => {
    return res.status(200).send(rs);
  });
}