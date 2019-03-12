import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  /**
   * Makes the selected place avaliable to the modal
   */
  @Input() selectedPlace: Place;

  /**
   * What date mode button was clicked
   */
  @Input() selectedMode: 'select' | 'random';

  /**
   * Makes the form viewable
   */
  @ViewChild('f') form: NgForm;

  /**
   * End and start dates for random date option
   */
  public startDate: string;
  public endDate: string;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    const avaliableFrom = new Date(this.selectedPlace.avaliableFrom);
    const avaliableTo = new Date(this.selectedPlace.avaliableTo);
    if (this.selectedMode === 'random') {
      this.startDate =
        new Date(avaliableFrom.getTime() +
          Math.random() *
          (avaliableTo.getTime() -
            7 * 24 * 60 * 60 * 1000 -
            avaliableFrom.getTime())
        ).toISOString();

      this.endDate =
        new Date(
          new Date(this.startDate).getTime() +
          Math.random() *
          (new Date(this.startDate).getTime() +
            6 * 24 * 60 * 60 * 1000 -
            new Date(this.startDate).getTime())
        ).toISOString();
    }
  }

  /**
   * Is called when the close modal button is pressed
   */
  public onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  /**
   * Is called when the book button is pressed.
   */
  public onBookPlace() {
    if (!this.form.valid || !this.datesValid) {
      return;
    }
    this.modalController.dismiss({
      bookingData: {
        firstName: this.form.value['first-name'],
        lastName: this.form.value['last-name'],
        guestNumber: this.form.value['guest-number'],
        startDate: this.form.value['date-from'],
        endDate: this.form.value['date-to']
      }
    }, 'confirm');
  }

  /**
   * Checker function to check start date isn't before end date
   */
  public datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }


}
