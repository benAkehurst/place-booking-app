import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { BookingService } from './booking.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  public loadedBooking: Booking[];

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.loadedBooking = this.bookingService.bookings;
  }

  /**
   * Method to cancel the booking of a location
   */
  public onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    console.log(offerId);
    // Cancel booking with offer ID

  }

}
