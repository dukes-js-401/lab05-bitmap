'use strict';

const fs = require('fs');
const util = require('util');
const buffer = require('buffer');

// NO, you may not read synchronosly ... this is only for expedience in the demo
const bald = fs.readFileSync(`${__dirname}/baldy.bmp`);
console.log('Bald:', bald);

// Create a naked object to model the bitmap properties
const parsedBitmap = {};

// Identify the offsets by reading the bitmap docs
const FILE_SIZE_OFFSET = 2;
const WIDTH_OFFSET = 18;
const HEIGHT_OFFSET = 22;
const BYTES_PER_PIXEL_OFFSET = 28;
const COLOR_PALLET_OFFSET = 46;
const COLOR_TABLE_OFFSET = 54; // number of bytes in the color table (color table === pixel array)
const PIXEL_ARRAY_OFFSET = 310; // The actual colors of the image. 256 (color table, a table of colors!) + 54 previous header)

// pixel-array tells you which part of the color table is being used by that pixel.

//------------------------------------------------------
// READING INFORMATION FROM THE BITMAP FILE
//------------------------------------------------------

parsedBitmap.type = bald.toString('utf-8', 0, 2);
parsedBitmap.fileSize = bald.readInt32LE(FILE_SIZE_OFFSET);
parsedBitmap.bytesPerPixel = bald.readInt16LE(BYTES_PER_PIXEL_OFFSET);
parsedBitmap.height = bald.readInt32LE(HEIGHT_OFFSET);
parsedBitmap.width = bald.readInt32LE(WIDTH_OFFSET);
parsedBitmap.colorPallet = bald.readInt32LE(COLOR_PALLET_OFFSET);
parsedBitmap.colorTable = bald.readInt32LE(COLOR_TABLE_OFFSET);
parsedBitmap.pixelArray = bald.readInt32LE(PIXEL_ARRAY_OFFSET);

console.log(parsedBitmap);

const colorTable = bald.slice(PIXEL_ARRAY_OFFSET);
const tableOfColors = bald.slice(COLOR_TABLE_OFFSET, PIXEL_ARRAY_OFFSET);

// Bottom left boundary = 1146
// Top right boundary = bald.length
// Color table lives in 121 to 1145
// Color table is in sets of 4, r g b 00
//777 is black
//746 lt gry
//604 drk gry
//630 md gry
// 760 = white
//756 is skin tone
//[54,55,56,57,58,59,60,61,62,63,64,65,66,67]
//7950 end
let col1 = '777';
let col2 = '640';
let col3 = '604';
let col4 = '746';
let start = [7787, 7896, 8007, 8119, 8230, 8342, 8453, 8564, 8676, 8787, 8899, 9011, 9123, 9236, 9348, 9461, 9576, 9118, 9006];
let end = [7800, 7916, 8029, 8141, 8254, 8366, 8478, 8590, 8703, 8817, 8962, 9074, 9186, 9297, 9378, 9488, 9596, 9123, 9011];
let offset = [33, 33, 33, 33, 33, 33, 34, 35, 34, 33, 0, 0, 0, 0, 31, 32, 33, 68, 68];
let trim1 = [9378, 8817, 8818, 8819, 7800, 7819, 8675, 8737, 8590, 8598, 8478, 8486, 8341,8366, 8374, 8399, 9297, 9235];
let trim2 = [9488, 9489, 9490, 9491, 9492, 9574, 9575, 9596, 9608, 9629, 9630, 9692, 9693, 9694, 9695, 9696, 9697, 9698, 9699, 9700, 9727, 9728, 9729, 9730, 9731, 9732, 9733, 9734, 9735, 7678, 7679, 7680, 7681, 7682, 7683, 7712, 7713, 7714, 7715, 7716, 7717, 8703, 8709];
let trim3 = [7710, 7711, 7718, 7719, 7684, 7685, 7676, 7777, 8704, 8708, 8591, 8597, 9735, 9736, 9737, 9738, 9739, 9740, 9726, 9725, 9724, 9723, 9722, 9701, 9702, 9703, 9704, 9705, 9706, 9691, 9690, 9689, 9688];



const glasses = function(col, arr, arr2) {
  for (let j = 0; j < arr.length; j++) {
    for (let i = arr[j]; i < arr2[j]; i++) {
      bald[i] = col;
      bald[i + offset[j]] = col;
    }
  }
};

const trim = function(col, arr){
  for(let i = 0; i < arr.length; i++){
    let position = arr[i];
    bald[position] = col;
  }
};


glasses(col1, start, end);
trim(col3,trim1);
trim(col2, trim2);
trim(col4, trim3);
console.log('bald[2000]:', bald[2000]);
console.log('bald.length:', bald.length);
fs.writeFile('./test2.bmp', bald, err => {
  if (err) throw err;
});