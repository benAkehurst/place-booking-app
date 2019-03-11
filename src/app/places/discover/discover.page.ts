import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  /**
   * Defines an array of all places
   */
  public loadedPlaces: Place[];

  /**
   * Defines an array of all the items, minus the first one
   */
  public listedLoadedPlaces: Place[];

  constructor(private placesService: PlacesService) { }

  /**
   * The init function gets a list of places from the places service
   */
  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
    this.listedLoadedPlaces = this.placesService.places.slice(1);
  }

}
