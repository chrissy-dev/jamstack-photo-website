const exif = require('fast-exif');

module.exports = async function (file) {
  return await exif.read(file).then(data => {
    return data.exif.DateTimeOriginal;
  }).catch(console.error);
}