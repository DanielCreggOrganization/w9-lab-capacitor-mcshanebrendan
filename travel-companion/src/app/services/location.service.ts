import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private watchId: number | null = null;

  constructor() {}

  /**
   * Get the current position as a one-time request
   */
  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
      return coordinates;
    } catch (error) {
      this.handleGeolocationError(error as GeolocationPositionError);
      throw error;
    }
  }

  /**
   * Start monitoring position updates
   * @param callback Function to handle position updates
   */
  startWatchingPosition(callback: (position: GeolocationPosition) => void) {
    if ('geolocation' in navigator) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log('New position:', position);
          callback(position);
        },
        (error) => {
          console.error('Error watching position:', error);
          this.handleGeolocationError(error as GeolocationPositionError);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
      alert('Geolocation is not available in your browser.');
    }
  }

  /**
   * Stop monitoring position updates
   */
  stopWatchingPosition() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      console.log('Stopped watching position.');
      this.watchId = null;
    }
  }

  /**
   * Handle geolocation errors and guide the user
   * @param error GeolocationPositionError
   */
  private handleGeolocationError(error: GeolocationPositionError) {
    switch (error.code) {
      case 1: // Permission Denied
        console.error('Permission denied. Please enable location permissions.');
        alert(
          'Location access is denied. To use this feature, please enable location permissions in your browser settings: \n\n' +
            '1. Click the lock icon in the address bar.\n' +
            '2. Go to "Site settings".\n' +
            '3. Enable location access and reload the page.'
        );
        break;
      case 2: // Position Unavailable
        console.error('Position unavailable.');
        alert('Location information is currently unavailable. Please try again later.');
        break;
      case 3: // Timeout
        console.error('Request timeout.');
        alert('Unable to get location. Request timed out. Please try again.');
        break;
      default:
        console.error('Unknown error occurred:', error.message);
        alert(`An unknown error occurred: ${error.message}`);
        break;
    }
  }
}
