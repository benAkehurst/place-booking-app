import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';

import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';

interface BookingData {
  bookedFrom: string;
  bookedTo: string;
  firstName: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  /**
   * Adds a new booking to the users bookings
   */
  public addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    return this.http
      .post<{ name: string }>(
        `https://ionic-angular-app.firebaseio.com/bookings.json`,
        { ...newBooking, id: null }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          newBooking.id = generatedId;
          this._bookings.next(bookings.concat(newBooking));
        })
      );
  }

  /**
   * Looks to see if a booking has a bookingid and deletes it if it does
   */
  public cancelBooking(bookingId: string) {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        this._bookings.next(bookings.filter(b => b.id !== bookingId));
      })
    );
  }

  /**
   * This function gets a list of bookings from the user in the booking list
   */
  public fetchBookings() {
    return this.http
      .get<{ [key: string]: BookingData }>(
        `https://ionic-angular-app.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${
          this.authService.userId
        }"`
      )
      .pipe(
        map(bookingData => {
          const bookingsArr = [];
          for (const key in bookingData) {
            if (bookingData.hasOwnProperty(key)) {
              bookingsArr.push(
                new Booking(
                  key,
                  bookingData[key].placeId,
                  bookingData[key].userId,
                  bookingData[key].placeTitle,
                  bookingData[key].placeImage,
                  bookingData[key].firstName,
                  bookingData[key].lastName,
                  bookingData[key].guestNumber,
                  new Date(bookingData[key].bookedFrom),
                  new Date(bookingData[key].bookedTo)
                )
              );
            }
          }
          return bookingsArr;
        }), tap(bookings => {
          this._bookings.next(bookings);
        })
      );
  }
}
