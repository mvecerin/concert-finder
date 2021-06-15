import {Entity, hasMany, model, property} from '@loopback/repository';
import {Concert} from './concert.model';

@model()
export class Location extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 1,
      maxLength: 90,
    },
  })
  address?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
      maxLength: 90,
    },
  })
  title: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 1,
      maxLength: 50,
    },
  })
  city?: string;

  @hasMany(() => Concert)
  concerts: Concert[];

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
