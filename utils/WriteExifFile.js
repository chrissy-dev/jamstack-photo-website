const exif = require('fast-exif');
const formatDate = require('./FormatDate');
const fs = require('fs-extra');
const getDateFromPhoto = require('./GetDateFromPhoto');
const path = require('path');
var iptc = require('node-iptc')


let GetIPTCData = async function(file) {
  let readFile = fs.readFileSync(file)
  return iptc(readFile);
}

module.exports = async function (file) {
  
  let newName = await getDateFromPhoto(file);
  newName = await formatDate(newName);
  let iptcData = await GetIPTCData(file);
 
  if(iptcData.keywords) {
    iptcData = {
      ...iptcData,
      tags: iptcData.keywords
    }
  }

  let exifData = await exif.read(file).then(data => {
    return {
      ...{
        image_path: newName + path.extname(file)
      },
      ...data,
      ...iptcData
    }
  }).catch(console.error);


  fs.writeFile(`src/_exifdata/${newName}.md`, `---json\n${JSON.stringify(exifData)}\n---`, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}