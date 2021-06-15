import {model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<NewUserRequest>) {
    super(data);
  }
}

export interface NewUserRequestRelations {
  // describe navigational properties here
}

export type NewUserRequestWithRelations = NewUserRequest &
  NewUserRequestRelations;
