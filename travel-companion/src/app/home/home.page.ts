import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg } from '@ionic/angular/standalone';
import { CameraService } from '../services/camera.service'; // Import the CameraService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg], // Include necessary Ionic components
})
export class HomePage {
  capturedImage?: string; // Property to hold the captured image

  constructor(private cameraService: CameraService) {} // Inject CameraService

  /**
   * Captures an image using the CameraService
   */
  async captureImage(): Promise<void> {
    try {
      this.capturedImage = await this.cameraService.takePicture();
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }
}
