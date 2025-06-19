import { useState, useEffect, useCallback } from 'react';

interface ImageCacheItem {
  src: string;
  loaded: boolean;
  element?: HTMLImageElement;
}

class ImageCache {
  private cache = new Map<string, ImageCacheItem>();
  private loading = new Set<string>();

  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.cache.has(src)) {
        resolve();
        return;
      }

      if (this.loading.has(src)) {
        // Wait for existing load to complete
        const checkLoaded = () => {
          if (this.cache.has(src)) {
            resolve();
          } else {
            setTimeout(checkLoaded, 50);
          }
        };
        checkLoaded();
        return;
      }

      this.loading.add(src);
      const img = new Image();
      
      img.onload = () => {
        this.cache.set(src, { src, loaded: true, element: img });
        this.loading.delete(src);
        resolve();
      };
      
      img.onerror = () => {
        this.loading.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });
  }

  isLoaded(src: string): boolean {
    return this.cache.get(src)?.loaded || false;
  }

  preloadMultiple(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map(src => this.preloadImage(src)));
  }
}

const imageCache = new ImageCache();

export function useImageCache(src: string | string[]) {
  const sources = Array.isArray(src) ? src : [src];
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const preloadImages = useCallback(async () => {
    try {
      setIsLoading(true);
      await imageCache.preloadMultiple(sources);
      setLoadedImages(new Set(sources));
    } catch (error) {
      console.error('Failed to preload images:', error);
    } finally {
      setIsLoading(false);
    }
  }, [sources]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  const isImageLoaded = useCallback((imageSrc: string) => {
    return loadedImages.has(imageSrc);
  }, [loadedImages]);

  return {
    isLoading,
    isImageLoaded,
    loadedImages: Array.from(loadedImages)
  };
}

export { imageCache };