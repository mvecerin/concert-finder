import {User} from '@loopback/authentication-jwt';
import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Location} from './location.model';
import {Performer} from './performer.model';

@model()
export class Concert extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    jsonSchema: {
      maximum: 100000,
      minimum: 0,
    },
  })
  ticketPrice?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
      maxLength: 90,
    },
  })
  title: string;

  @belongsTo(
    () => Location,
    {},
    {mongodb: {dataType: 'ObjectId'}, required: true},
  )
  locationId: string;

  @belongsTo(
    () => Performer,
    {},
    {mongodb: {dataType: 'ObjectId'}, required: true},
  )
  performerId: string;

  @belongsTo(() => User, {}, {required: true})
  userId: string;

  constructor(data?: Partial<Concert>) {
    super(data);
  }
}

export interface ConcertRelations {
  // describe navigational properties here
}

export type ConcertWithRelations = Concert & ConcertRelations;
