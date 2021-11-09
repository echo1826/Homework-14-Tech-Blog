const moment = require('moment');

function format_time(date) {
    return date = moment(date).format('MM/DD/YYYY');
} 

module.exports = {format_time};