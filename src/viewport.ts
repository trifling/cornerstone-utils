
import { CornerstoneInstances } from './init';
import { loadImagesInZipFile } from './loading';

const { cornerstone, cornerstoneTools } = CornerstoneInstances;

/**
 * Load a DICOM zip file in a viewport
 *
 * @param url The url for the zip file
 * @param element The div element of the viewport
 */
export async function loadZipFileInViewport(url: string, element: HTMLElement): Promise<void> {

  const response = await fetch(url);

  cornerstone.enable(element);

  const data = await response.blob();
  const { imageLoadedEvent, imageStack } = loadImagesInZipFile(data);
  const stack = await imageStack;

  const images = stack.imageIds;
  if (images.length !== 0) {
    const idx = Math.round(images.length / 2);
    stack.currentImageIdIndex = idx;
    return cornerstone.loadImage(images[idx]).then((image: any) => {
      cornerstone.displayImage(element, image);

      cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });

      cornerstoneTools.addToolForElement(element, cornerstoneTools.StackScrollMouseWheelTool);
      cornerstoneTools.setToolActive('StackScrollMouseWheel', { mouseButtonMask: 2 });

      cornerstoneTools.addStackStateManager(element, ['stack']);
      cornerstoneTools.addToolState(element, 'stack', stack);

    });
  }
}
