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
   * Defines an array of places
   */
  public loadedPlaces: Place[];

  constructor(private placesService: PlacesService) { }

  /**
   * The init function gets a list of places from the places service
   */
  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
  }

}
