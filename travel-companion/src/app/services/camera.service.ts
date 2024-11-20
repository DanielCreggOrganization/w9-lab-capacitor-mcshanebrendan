import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  /**
   * Takes a picture using the device's camera or file picker
   * @returns Promise<string | undefined>
   */
  async takePicture(): Promise<string | undefined> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera, // Force camera use
        quality: 90,
      });

      return image.base64String
        ? `data:image/jpeg;base64,${image.base64String}`
        : undefined;
    } catch (error: any) {
      if (error.message === 'User cancelled photos app') {
        console.log('User cancelled the camera or photo selection.');
        return undefined; // Gracefully return undefined
      }

      // Log other errors
      console.error('Error taking picture:', error);
      throw error; // Rethrow for unexpected issues
    }
  }
}
