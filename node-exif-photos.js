const fs = require('fs-extra');
const glob = require("fast-glob");
const optimisePhoto = require("./utils/OptimisePhoto");
const writeExifFile = require("./utils/WriteExifFile");

(async function () {
  const OPTIONS = {
    widths: [520, 960],
    input_photos_dir: "src/_photos",
    output_photos_dir: "src/photos"
  };

  var files = await glob([
    `${OPTIONS.input_photos_dir}/*.{jpg,jpeg,JPG,JPEG}`,
  ]);

  // Copy the contents _exifdata/_exifdata.json file
  var templateDataFile = fs.readFileSync('src/_exifdata/_exifdata.json', 'utf8');

  // Empty the _exifdata folder - regenerate files based on current photos tree
  fs.emptyDirSync('src/_exifdata');

  // Re-write the file to enable a collection
  fs.writeJson('src/_exifdata/_exifdata.json', JSON.parse(templateDataFile), err => {
    if (err) return console.error(err)
    console.log('Wrote _exifdata.json file.')
  })

  files.forEach(async (file) => {
    // Creates optimised versions for each item in OPTIONS.widths, always creates a 20px wide blur
    // These are available in the same folder w{width} eg. /w320/dd_LL_yyyy_hhmmss.jpg
    await optimisePhoto(file, OPTIONS.widths, OPTIONS.output_photos_dir);

    // // Writes a file with JSON frontmatter exposing the exif data
    await writeExifFile(file, OPTIONS.input_photos_dir);
  })
})();