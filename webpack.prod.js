const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  externals: {
    "jszip": "jszip",
    "rxjs": "rxjs",
    "cornerstone-core": "cornerstone",
    "cornerstone-wado-image-loader": "cornerstoneWADOImageLoader",
    "cornerstone-math": "cornerstoneMath",
    "cornerstone-tools": "cornerstoneTools",
    "dicom-parser": "dicomParser"
  }
});
