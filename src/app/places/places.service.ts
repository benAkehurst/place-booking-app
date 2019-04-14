import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';

/**
 * Defines responce type for get places request
 * Used when needing to join place id into place obj from server
 */
interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public _places = new BehaviorSubject<Place[]>([]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  /**
   * Gets from HTTP the places in the DB
   */
  public fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-angular-app.firebaseio.com/offered-places.json'
      )
      .pipe(
        map(resData => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  /**
   * Gets all the places from the DB
   */
  public getPlace(id: string) {
    return this.http
      .get<PlaceData>(
        `https://ionic-angular-app.firebaseio.com/offered-places/${id}.json`
      )
      .pipe(
        map(placeData => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId
          );
        })
      );
  }

  /**
   * Adds a new place to the server on firebase
   * It builds a new place using the place model
   * It stored a blank var to use when the post returns the new place id
   */
  public addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
    const newPlace = new Place(
      null,
      title,
      description,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    return this.http
      .post<{ name: string }>(
        'https://ionic-angular-app.firebaseio.com/offered-places.json',
        {
          ...newPlace
        }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }

  /**
   * Updates a place in the app
   */
  public updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(
          `https://ionic-angular-app.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}

// [
//   new Place(
//     'p1',
//     'London Terrace House',
//     'This is a 4 bedroom house in London',
//     'https://lid.zoocdn.com/645/430/a5782818c4099dd83f42613511bc86c604838614.jpg',
//     220.0,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'xyz'
//   ),
//   new Place(
//     'p2',
//     'Large London Flat',
//     'This is a 3 bedroom flat in London',
//     'https://lid.zoocdn.com/645/430/bbf8ccf0b241cc6200ad2c8787a66aecd264b3a6.jpg',
//     125.0,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p3',
//     'Medium London Flat',
//     'This is a 2 bedroom flat in London',
//     'https://lid.zoocdn.com/645/430/c814a6d27a1d00827eb40640cfb34f302defd39c.jpg',
//     110.0,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p4',
//     'Small London Flat',
//     'This is a 1 bedroom flat in London',
//     'https://lid.zoocdn.com/645/430/26e99a8ae88dab9d4f4084a1876bae8a1ab88a1d.jpg',
//     100.0,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   )
// ]
