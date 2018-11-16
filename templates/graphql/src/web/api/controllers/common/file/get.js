const fs = require('fs');
const Common = require('../../../common');
const fileSystem = require('../../../../../infrastruture/utilities/filesystem');
const hasher = require('../../../../../infrastruture/helpers/hasher');

module.exports = async function (req, res) {
  try {
    const name = req.query['name'];
    const decrytedName = hasher.decrypt(name);
    const params = JSON.parse('{"' + decodeURI(decrytedName.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
    const dir = params.dir;
    const filename = params.filename;
    const tenant = params.tenant;

    if (!filename || !dir || !tenant) {
      return res.status(400).send(new Common.ResAsMsg(true, 'FILE_NOT_FOUND'));
    }

    const filePath = fileSystem.get(tenant, dir, filename);
    if (!filePath) {
      return res.status(400).send(new Common.ResAsMsg(true, 'FILE_NOT_FOUND'));
    }

    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "attachment; filename=" + filename
    });
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return res.sendStatus(500);
    } else {
      return res.status(500).send(error);
    }
  }
}
