import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  /**
   * Defines an new form
   */
  public form: FormGroup;

  /**
   * Defines the place to be accesses by template
   */
  public place: Place;

  /**
   * Var to hold the subscription to observable
   */
  private placeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController
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
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          })
        });
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

  public onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating place...'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.placesService.updatePlace(this.place.id, this.form.value.title, this.form.value.description)
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/offers']);
        });
    })
  }

}
