import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'London Terrace House',
      'This is a 4 bedroom house in London',
      'https://lid.zoocdn.com/645/430/a5782818c4099dd83f42613511bc86c604838614.jpg',
      220.0
    ),
    new Place(
      'p2',
      'Large London Flat',
      'This is a 3 bedroom flat in London',
      'https://lid.zoocdn.com/645/430/bbf8ccf0b241cc6200ad2c8787a66aecd264b3a6.jpg',
      125.0
    ),
    new Place(
      'p3',
      'Medium London Flat',
      'This is a 2 bedroom flat in London',
      'https://lid.zoocdn.com/645/430/c814a6d27a1d00827eb40640cfb34f302defd39c.jpg',
      110.0
    ),
    new Place(
      'p4',
      'Small London Flat',
      'This is a 1 bedroom flat in London',
      'https://lid.zoocdn.com/645/430/26e99a8ae88dab9d4f4084a1876bae8a1ab88a1d.jpg',
      100.0
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}

  public getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }
}
