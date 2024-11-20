import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for @if
import { IonicModule } from '@ionic/angular';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit, OnDestroy {
  position: GeolocationPosition | null = null;

  constructor(private locationService: LocationService) {}

  /**
   * Getter to determine if position and coords are defined
   */
  get hasCoords(): boolean {
    return this.position !== null && this.position.coords !== undefined;
  }

  ngOnInit() {
    // Start watching position updates
    this.locationService.startWatchingPosition((position) => {
      this.position = position;
      console.log('Updated position:', position);
    });
  }

  ngOnDestroy() {
    // Stop watching when the component is destroyed
    this.locationService.stopWatchingPosition();
  }
}
