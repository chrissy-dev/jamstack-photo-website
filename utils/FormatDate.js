const {
  DateTime
} = require('luxon');

module.exports = async function (date) {
  return DateTime.fromJSDate(new Date(date), {
    zone: 'utc'
  }).toFormat('dd_LL_yyyy_hhmmss');
}