import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  /**
   * Defines the place to be accesses by template
   */
  public place: Place;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) { }

  /**
    * This function looks to see if a place id is being passed as a route param
    * If the place id exists on the route param is then it gets the place from the places service
    */
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

}
