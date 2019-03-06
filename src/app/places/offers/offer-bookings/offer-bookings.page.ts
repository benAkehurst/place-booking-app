import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  /**
   * Defines the place to be accesses by template
   */
  public place: Place;

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
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

}
