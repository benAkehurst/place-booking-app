/**
 * Defines a model of 'what' a place consists of
 */

export class Place {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public price: number,
    public avaliableFrom: Date,
    public avaliableTo: Date
  ) {}
}
