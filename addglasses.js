'use strict';

const fs = require('fs');

const bald = fs.readFile(`${__dirname}/baldy.bmp`);
console.log('Bald:', bald);


let col1 = '777';
let col2 = '640';
let col3 = '604';
let col4 = '746';
let start = [7787, 7896, 8007, 8119, 8230, 8342, 8453, 8564, 8676, 8787, 8899, 9011, 9123, 9236, 9348, 9461, 9576, 9118, 9006];
let end = [7800, 7916, 8029, 8141, 8254, 8366, 8478, 8590, 8703, 8817, 8962, 9074, 9186, 9297, 9378, 9488, 9596, 9123, 9011];
let offset = [33, 33, 33, 33, 33, 33, 34, 35, 34, 33, 0, 0, 0, 0, 31, 32, 33, 68, 68];
let trim1 = [9378, 8817, 8818, 8819, 7800, 7819, 8675, 8737, 8590, 8598, 8478, 8486, 8341, 8366, 8374, 8399, 9297, 9235];
let trim2 = [9488, 9489, 9490, 9491, 9492, 9574, 9575, 9596, 9608, 9629, 9630, 9692, 9693, 9694, 9695, 9696, 9697, 9698, 9699, 9700, 9727, 9728, 9729, 9730, 9731, 9732, 9733, 9734, 9735, 7678, 7679, 7680, 7681, 7682, 7683, 7712, 7713, 7714, 7715, 7716, 7717, 8703, 8709];
let trim3 = [7710, 7711, 7718, 7719, 7684, 7685, 7676, 7777, 8704, 8708, 8591, 8597, 9735, 9736, 9737, 9738, 9739, 9740, 9726, 9725, 9724, 9723, 9722, 9701, 9702, 9703, 9704, 9705, 9706, 9691, 9690, 9689, 9688];



const glasses = function (col, arr, arr2) {
  for (let j = 0; j < arr.length; j++) {
    for (let i = arr[j]; i < arr2[j]; i++) {
      bald[i] = col;
      bald[i + offset[j]] = col;
    }
  }
};

const trim = function (col, arr) {
  for (let i = 0; i < arr.length; i++) {
    let position = arr[i];
    bald[position] = col;
  }
};


glasses(col1, start, end);
trim(col3, trim1);
trim(col2, trim2);
trim(col4, trim3);