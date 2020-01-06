const formatDate = require('./FormatDate');
const fs = require('fs-extra');
const getDateFromPhoto = require('./GetDateFromPhoto');
const JIMP = require('jimp');
const path = require('path');

module.exports = async function (file, widths, outputDir) {
  let newName = await getDateFromPhoto(file);
  newName = await formatDate(newName) + path.extname(file);

  widths.map(width => {
    fs.exists(`${outputDir}/w${width}/${newName}`, async function (exists) {
      if (!exists) {
        const image = await JIMP.read(file);
        image.resize(width, JIMP.AUTO); // resize
        image.quality(80); // set JPEG quality
        image.writeAsync(`${outputDir}/w${width}/${newName}`);
        console.log(`Generated: ${outputDir}/w${width}/${newName}`);
      }
    });
  });

  fs.exists(`${outputDir}/blur/${newName}`, async function (exists) {
    if (!exists) {
      const image = await JIMP.read(file);
      image.resize(20, JIMP.AUTO); // resize
      image.quality(80); // set JPEG quality
      image.gaussian(3); // fast blur the image by r pixels
      image.writeAsync(`${outputDir}/blur/${newName}`);
      console.log(`Generated: ${outputDir}/blur/${newName}`);
    }
  });
}