import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

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

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

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
    this.modalController.dismiss({message: 'Book Clicked'}, 'confirm');
  }


}
