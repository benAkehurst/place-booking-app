import { Component, OnInit } from '@angular/core';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  /**
   * Makes an empty array of places to be held as offers
   */
  public offers: Place[];

  constructor(private placesService: PlacesService) { }

  /**
   * Gets the offers from the places service
   */
  ngOnInit() {
    this.offers = this.placesService.places;
  }

}
