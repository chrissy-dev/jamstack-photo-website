# JAMStack Photo Website

Demo sites:

- [scottishstoater.com](https://www.scottishstoater.com)

## What is this?

This is a proof-of-concept workflow that extracts EXIF data embeded in photos to generate a static website using [Eleventy](https://11ty.dev). 

There is a few reasons behind exploring this approach:

- Treat your photos as content by utilising and extracting the information they already hold.
- Speed of maintaining your website. Drop in a photo and go.
- Owning your data. Easily self host and control your own photo gallery.

## A note on privacy

I'm an advocate for protecting users privacy and this project is all about owning your own data. As pointed out by [@zachleath in this tweet](https://twitter.com/eleven_ty/status/1209543773425942529?s=20) EXIF data can hold a lot of personally identifiable information - it's up to you what you display but only what you choose to display is included in the site. All photo files are stripped of embedded meta data during the build.

## What's the script doing?

1. Looks for photos in the top level of a specified folder (eg. src/_photos)
2. Resizes and optimises each photo based on widths the user has supplied and outputs the results into a seperate specified folder (eg. src/photos/w???/*.jpg).
3. Rename each resized photo to a standard format based on it's date (dd_LL_yyyy_hhmmss)
4. Extract the EXIF data and IPTC data and creates a file in `src/_exifdata` for Eleventy to pick up as part of a collection, named (dd_LL_yyyy_hhmmss).
_This last step was originially piped into Eleventy using a data file. That approach still works but you don't get text based version control of the exif data._

## Photo requirements

Each source photo must have an EXIF value for `DateTimeOriginal` - anything else is at your disposal.

## Getting started

1. Install dependencies

```
npm install
```

2. Drop a few photos that meet the [minimal requirements](#Photo-requirements) in `src/_photos`.

3. Start the development server
This step runs `node-exif-photos` then `eleventy`.

```
npm start
```

### Generate a build

```
npm run build
```

## Known Limitations 

- Only JPG support.
- Not commiting the resized files will regenerate them on a pipeline, with a lot of photos this will take a while. Commiting the files solves this. 
- Adding lots of files at once will take a long time, try adding a max of 20 at a time.



