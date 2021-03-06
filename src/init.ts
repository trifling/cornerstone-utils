
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';

export interface ICornerstoneInstance {
  cornerstone: any;
  cornerstoneMath: any;
  cornerstoneTools: any;
  cornerstoneWADOImageLoader: any;
  dicomParser: any;
}

export const CornerstoneInstances = {
  cornerstone,
  cornerstoneMath,
  cornerstoneTools,
  cornerstoneWADOImageLoader,
  dicomParser,
};

/**
 * Initialize cornerstone core, tools and loader.
 *
 * @param showSVGCursors Whether tools should change the cursor when enabled
 * @returns Instances of cornerstone core, tools and loader.
 */
export function initCornerstone(showSVGCursors = false): ICornerstoneInstance {
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
      },
    },
  });
  cornerstoneTools.init({ showSVGCursors });
  return CornerstoneInstances;
}
