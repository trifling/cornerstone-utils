export { loadImagesInZipFile, loadImages, IImageLoadedEvent, IImageStack } from './loading';
export { initCornerstone } from './init';
export { loadZipFileInViewport } from './viewport';

import { CornerstoneInstances } from './init';

export const { cornerstone, cornerstoneTools, cornerstoneWADOImageLoader, cornerstoneMath, dicomParser }
  = CornerstoneInstances;
