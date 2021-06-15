import {Entity, hasMany, model, property} from '@loopback/repository';
import {Concert} from './concert.model';

@model()
export class Performer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
      maxLength: 90,
    },
  })
  name: string;

  @hasMany(() => Concert)
  concerts: Concert[];

  constructor(data?: Partial<Performer>) {
    super(data);
  }
}

export interface PerformerRelations {
  // describe navigational properties here
}

export type PerformerWithRelations = Performer & PerformerRelations;
