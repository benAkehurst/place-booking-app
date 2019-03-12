import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  /**
   * Defines an new form
   */
  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    /**
     * Build a basic blank form when the page is generated
     */
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }

  /**
   * Creates a new offer
   */
  public onCreateOffer() {
    console.log(this.form);
  }

}
