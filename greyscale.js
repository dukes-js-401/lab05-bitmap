'use strict';

const transformGreyscale = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);

  if (Buffer.isBuffer(this.buffer) === false) { return null; }
  for (let i = bmp.PIXEL_MAP_OFFSET - 1; i > bmp.COLOR_PALLET_OFFSET; i -= 4) {
    let greyScale = (bmp.colorPallet[i - 1] + bmp.colorPallet[i - 2] + bmp.colorPallet[i - 3]) / 3;
    bmp.colorPallet[i - 1] = greyScale;
    bmp.colorPallet[i - 2] = greyScale;
    bmp.colorPallet[i - 3] = greyScale;
  }
};