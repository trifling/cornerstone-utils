
import * as loading from '../src/loading';

declare const cornerstone;
declare const cornerstoneTools;

window.onload = async () => {

  const response = await fetch('Prostate.zip');

  const viewportElement = document.getElementById('viewport1');
  cornerstoneTools.init({ showSVGCursors: true });
  cornerstone.enable(viewportElement);
  const data = await response.blob();
  const { imageLoadedEvent, imageStack } = loading.loadImagesInZipFile(data);
  const stack = await imageStack;

  const images = stack.imageIds;
  if (images.length !== 0) {
    const idx = Math.round(images.length / 2);
    stack.currentImageIdIndex = idx;
    cornerstone.loadImage(images[idx]).then(image => {
      cornerstone.displayImage(viewportElement, image);
    
      cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })
      
      cornerstoneTools.addToolForElement(viewportElement, cornerstoneTools.StackScrollMouseWheelTool);
      cornerstoneTools.setToolActive('StackScrollMouseWheel', { mouseButtonMask: 2 });
      
      cornerstoneTools.addStackStateManager(viewportElement, ['stack']);
      cornerstoneTools.addToolState(viewportElement, 'stack', stack);
    });
  }

    //   const xhr = new XMLHttpRequest();
    // xhr.responseType = "blob";
    // xhr.onload = async (_) => {
    //   const { images, stack } = loadImagesInZipFile(xhr.response);
    //   stack.then(stack => {
    //     const el = this.renderRoot.querySelector('cornerstone-viewport');
    //     el.setAttribute('images', JSON.stringify(stack.imageIds));
    //   });
    // };
    // xhr.open('GET', '/assets/datasets/Prostate.zip');
    // xhr.send();
    // cornerstoneTools.init({
    //   touchEnabled: false,
    //   showSVGCursors: false,
    // });
 


  // const imageURI = `wadouri:${imageURL}`
  // const element = document.getElementById('viewport1');
  // cornerstone.enable(element);
  // cornerstone.loadAndCacheImage(imageURI).then((image) => {
  //   const viewport = cornerstone.getDefaultViewportForImage(element, image);
  //   cornerstone.displayImage(element, image, viewport);
  // });
}
