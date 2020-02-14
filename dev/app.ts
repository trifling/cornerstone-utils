
import { initCornerstone } from '../src/init';
import { loadZipFileInViewport } from '../src/viewport';

window.onload = async () => {
  initCornerstone(true);
  const viewportElement = document.getElementById('viewport1');
  if (viewportElement) {
    loadZipFileInViewport('Prostate.zip', viewportElement);
  }
};
