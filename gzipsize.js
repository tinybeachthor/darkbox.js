/* eslint-disable */

const zlib = require('zlib');
const fs = require('fs');

const filepath = './dist/js/darkbox.min.js';

fs.readFile(filepath, 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	console.log('original size: ' + (Buffer.byteLength(data, 'utf8') / 1024).toFixed(2) + 'kB');
	console.log('gzipped size:  ' + (Buffer.byteLength(zlib.gzipSync(data), 'utf8') / 1024).toFixed(2) + 'kB');
});
