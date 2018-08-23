const path = require('path');
const _ = require('lodash');
const Common = require('../../../common');

module.exports = async function(req, res) {
  try {
    req.file('file').upload(async function (err, files){
      if (err) return res.send(500, err);
      let uploadedFiles = [];
      _.forEach(files, (file) => {
        uploadedFiles.push({
          original: file.filename,
          fd: path.basename(file.fd)
        });
      });
      return res.send(200, new Common.ResAsObj(uploadedFiles));
    });
  } catch (error) {
    return res.send(500, new Common.ResAsObj(err));
  }
}