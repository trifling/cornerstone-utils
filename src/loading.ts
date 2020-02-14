
import * as jszip from 'jszip';
import * as rxjs from 'rxjs';

import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

/**
 * A Cornerstone stack of images
 */
export interface IImageStack {
  currentImageIdIndex: number;
  imageIds: string[];
}

/**
 * Event triggered when an image has been loaded
 */
export interface IImageLoadedEvent {
  image: any;
  partial: number;
  total: number;
}

/**
 * Loads and caches all the images in the zip file.
 *
 * Returns an observable that sends each image as it is loaded, and a promise with a ImageStack
 * ordered by Instance Number (DICOM (0x0020, 0x0013)) when finished loading all images.
 *
 * @param file The ZIP file to read images from
 */
export function loadImagesInZipFile(zipFile: any): { imageLoadedEvent: rxjs.Observable<IImageLoadedEvent>,
  imageStack: Promise<IImageStack> } {
  const reader = new FileReader();

  const imageLoadedEvent = new rxjs.Subject<IImageLoadedEvent>();
  const imageStack = new Promise<IImageStack>((resolve) => {
    reader.onloadend = (_) => {
      jszip.loadAsync(reader.result).then((zip: any) => {
        const files: string[] = Object.keys(zip.files);

        const filesToLoad = files.filter((file) => !zip.files[file].dir);
        const totalFiles = filesToLoad.length;
        let partial = 0;
        Promise.all(filesToLoad.map((file) => {
          return zip.file(file).async('arraybuffer').then((data: any) => {
            const blob = new Blob([data], {type: ''}) as any;
            const url = URL.createObjectURL(blob);
            const imageId = 'wadouri:' + url;
            return cornerstone.loadAndCacheImage(imageId).then((imageData: any) => {
              partial += 1;
              imageLoadedEvent.next({
                image: imageData,
                total: totalFiles,
                partial,
              });
              URL.revokeObjectURL(url);
              return imageData;
            });
          });
        })).then((imageList) => {
          const sortedList = imageList.sort((a, b) => {
            const aa = parseInt(a.data.string('x00200013'), 10);
            const bb = parseInt(b.data.string('x00200013'), 10);
            return aa - bb;
          });
          imageLoadedEvent.complete();
          resolve({ currentImageIdIndex: 0, imageIds: sortedList.map((x) => x.imageId) });

        });
      });
    };
  });
  reader.readAsArrayBuffer(zipFile);
  return { imageLoadedEvent, imageStack };
}

/**
 * Loads and caches all the given images.
 *
 * Returns an observable that sends each image as it is loaded, and a promise with a ImageStack
 * ordered by Instance Number (DICOM (0x0020, 0x0013)) when finished loading all images.
 *
 * @param files A list with the image files
 */
export function loadImages(filesToLoad: any): { imageLoadedEvent: rxjs.Observable<IImageLoadedEvent>,
  imageStack: Promise<IImageStack> } {
  const imageLoadedEvent = new rxjs.Subject<IImageLoadedEvent>();
  const imageStack = new Promise<IImageStack>((resolve) => {
    const totalFiles = filesToLoad.length;
    let partial = 0;

    const promises: Array<Promise<any>> = [];
    for (const file of filesToLoad) {
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
      const promise = cornerstone.loadAndCacheImage(imageId).then((imageData: any) => {
        partial += 1;
        imageLoadedEvent.next({
          image: imageData,
          total: totalFiles,
          partial,
        });
        cornerstoneWADOImageLoader.wadouri.fileManager.remove(imageId);
        return imageData;
      });
      promises.push(promise);
    }
    Promise.all(promises).then((imageList) => {
      const sortedList = imageList.sort((a: any, b: any) => {
        const aa = parseInt(a.data.string('x00200013'), 10);
        const bb = parseInt(b.data.string('x00200013'), 10);
        return aa - bb;
      });
      imageLoadedEvent.complete();
      resolve({ currentImageIdIndex: 0, imageIds: sortedList.map((x: any) => x.imageId) });
    });
  });
  return { imageLoadedEvent, imageStack };
}
