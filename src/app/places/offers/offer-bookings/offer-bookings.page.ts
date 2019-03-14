import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  /**
   * Defines the place to be accesses by template
   */
  public place: Place;

  /**
   * Private Var to hold the subscription to the observable
   */
  private placeSub: Subscription;

  constructor(
    private activtedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) { }

  /**
   * This function looks to see if a place id is being passed as a route param
   * If the place id exists on the route param is then it gets the place from the places service
   */
  ngOnInit() {
    this.activtedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
      });
    });
  }

  /**
   * Kills the observable when the component is destroyed
   */
  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
