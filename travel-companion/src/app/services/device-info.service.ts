import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceInfoService {
  constructor() {}

  async getDeviceInfo() {
    try {
      // Fetch device info using Capacitor plugin
      const info = await Device.getInfo();

      // Fallback for userAgent and language using browser's navigator object
      return {
        ...info,
        userAgent: navigator.userAgent || 'N/A', // Fallback to navigator.userAgent
        language: navigator.language || 'N/A', // Fallback to navigator.language
      };
    } catch (error) {
      console.warn('Capacitor Device plugin not available. Using fallback.');
      // Fallback entirely to navigator properties
      return {
        userAgent: navigator.userAgent || 'N/A',
        platform: navigator.platform || 'N/A',
        language: navigator.language || 'N/A',
      };
    }
  }
}
