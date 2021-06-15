import {User as _User} from '@loopback/authentication-jwt';
import {hasMany, model} from '@loopback/repository';
import {Concert} from './concert.model';

@model()
export class User extends _User {
  @hasMany(() => Concert)
  concerts?: Concert[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
