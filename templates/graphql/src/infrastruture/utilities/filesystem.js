const fs = require('fs');
const path = require('path');
const basePath = path.resolve(__dirname, '../../storages');
const Errors = require('../common/errors');

const save = (tenant, destDir, srcDirPath, srcFileName) => {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath);
      }

      const tenantPath = path.resolve(basePath, tenant);
      if (!fs.existsSync(tenantPath)) {
        fs.mkdirSync(tenantPath);
      }

      const destPath = path.resolve(tenantPath, destDir);
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }

      const destFile = path.resolve(destPath, srcFileName);

      const stream = fs.createReadStream(srcDirPath);

      stream.pipe(fs.createWriteStream(destFile));

      stream.on('error', (error) => {
        reject(new Error(Errors.FILE_NOT_FOUND));
      });

      stream.on('close', () => {
        resolve(destFile);
      });

    } catch (error) {
      reject(new Error(error));
    }
  });
};

const get = (tenant, dir, filename) => {
  const tenantPath = path.resolve(basePath, tenant);
  if (!fs.existsSync(tenantPath)) {
    return null;
  }

  const dirPath = path.resolve(tenantPath, dir);
  if (!fs.existsSync(dirPath)) {
    return null;
  }
  const filePath = path.resolve(dirPath, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return filePath;
};

module.exports = {
  save: save,
  get: get
};
