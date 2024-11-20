// src/app/services/camera.service.ts
import { Injectable } from '@angular/core';
// Import Capacitor Camera plugin and its types
import { Camera, CameraResultType } from '@capacitor/camera';

// Injectable decorator marks this as a service that can be dependency injected
@Injectable({
  providedIn: 'root'  // Service is provided at the root level, creating a singleton instance
})
export class CameraService {
  /**
   * Takes a picture using the device's camera
   * @returns Promise<string | undefined> Returns base64 encoded image string or undefined if failed
   */
  async takePicture(): Promise<string | undefined> {
    // Use Capacitor Camera API to capture photo
    const image = await Camera.getPhoto({
      // Request base64 format for easy display in HTML img tag
      resultType: CameraResultType.Base64,
      // Set image quality (0-100)
      quality: 90
    });

    // Convert base64 string to data URL format for img src attribute
    // Returns undefined if no image was captured
    return image.base64String 
      ? `data:image/jpeg;base64,${image.base64String}` 
      : undefined;
  }
}