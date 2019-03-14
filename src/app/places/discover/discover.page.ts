import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  /**
   * Defines an array of all places
   */
  public loadedPlaces: Place[];

  /**
   * Defines an array of all the items, minus the first one
   */
  public listedLoadedPlaces: Place[];

  /**
   * Private observable to hold the subscription
   */
  private placesSub: Subscription;

  constructor(private placesService: PlacesService) { }

  /**
   * The init function gets a list of places from the places service
   */
  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  /**
   * Kills the observable when the component is destroyed
   */
  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  public onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

}
