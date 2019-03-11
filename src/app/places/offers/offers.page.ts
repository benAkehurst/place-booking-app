import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Router } from '@angular/router';

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

  constructor(private placesService: PlacesService, private router: Router) { }

  /**
   * Gets the offers from the places service
   */
  ngOnInit() {
    this.offers = this.placesService.places;
  }

  /**
   * Goes to the edit offer page of a chose item
   */
  public onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }

}
