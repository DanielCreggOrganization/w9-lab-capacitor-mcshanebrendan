import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
} from '@ionic/angular/standalone';
import { CameraService } from '../services/camera.service'; // Import the CameraService
import { DeviceInfoService } from '../services/device-info.service'; // Import the DeviceInfoService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg], // Include necessary Ionic components
})
export class HomePage implements OnInit {
  capturedImage?: string; // Property to hold the captured image
  deviceInfo?: any; // Property to hold device information

  constructor(
    private cameraService: CameraService, // Inject CameraService
    private deviceInfoService: DeviceInfoService // Inject DeviceInfoService
  ) {}

  /**
   * Lifecycle hook to fetch device info on initialization
   */
  async ngOnInit(): Promise<void> {
    try {
      this.deviceInfo = await this.deviceInfoService.getDeviceInfo();
      console.log('Device Info:', this.deviceInfo);
    } catch (error) {
      console.error('Error fetching device info:', error);
    }
  }

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
