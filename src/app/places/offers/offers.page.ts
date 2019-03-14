import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  /**
   * Makes an empty array of places to be held as offers
   */
  public offers: Place[];

  /**
   * Makes a private variable to hold the subscription
   */
  private placesSub: Subscription;

  constructor(private placesService: PlacesService, private router: Router) { }

  /**
   * Gets the offers from the places service observable
   */
  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.offers = places;
    });
  }

  /**
   * Gets called when the compinent is destoryed and cancels the subscription to the observable
   */
  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  /**
   * Goes to the edit offer page of a chose item
   */
  public onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }

}
