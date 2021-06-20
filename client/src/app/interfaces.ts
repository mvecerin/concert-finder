// USER
export interface IUser {
  id?: string;
  username: string;
}
export interface IUserCredentials {
  password: string;
  email?: string;
}
export interface IUserState {
  isAuth: boolean;
  user: IUser | null;
}

// CONCERT
export interface IConcertBase {
  id?: string;
  date: string;
  ticketPrice?: number;
  title: string;
  userId: string;
}
export interface IConcert extends IConcertBase {
  locationId: string;
  performerId: string;
}
export interface IConcertFull extends IConcertBase {
  location: ILocation;
  performer: IPerformer;
}

export interface ILocation {
  id?: string;
  title: string;
  address?: string;
  city?: string;
}
export interface IPerformer {
  id?: string;
  name: string;
}

export interface IFilter {
  filterLocation: string;
  filterPerformer: string;
  filterTicket: number;
}
