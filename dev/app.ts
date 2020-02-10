
import '../src/loading';
import imageURL from './image-000200.dcm';

declare const cornerstone;

window.onload = () => {
  const imageURI = `wadouri:${imageURL}`
  const element = document.getElementById('viewport1');
  cornerstone.enable(element);
  cornerstone.loadAndCacheImage(imageURI).then((image) => {
    const viewport = cornerstone.getDefaultViewportForImage(element, image);
    cornerstone.displayImage(element, image, viewport);
  });
}
