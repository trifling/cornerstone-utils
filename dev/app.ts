
import { initCornerstone, loadZipFileInViewport } from '../src';

window.onload = async () => {

  initCornerstone(true);

  const viewportElement = document.getElementById('viewport1');

  if (viewportElement !== null) {
    loadZipFileInViewport('Prostate.zip', viewportElement);
  }
}
