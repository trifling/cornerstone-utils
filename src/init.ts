
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as dicomParser from 'dicom-parser';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';

/**
 * Initialize cornerstone core, tools and loader
 */
export function initCornerstone(showSVGCursors = false) {
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneWADOImageLoader.external.cornerstoneMath = cornerstoneMath;
  cornerstoneWADOImageLoader.wadouri.register(cornerstone);
  cornerstoneWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency,
    startWebWorkersOnDemand: true,
    webWorkerTaskPaths: [],
    taskConfiguration: {
          decodeTask: {
          initializeCodecsOnStartup: false,
          strict: true,
          usePDFJS: false,
      }
    }
  });
  cornerstoneTools.init({ showSVGCursors });
}
