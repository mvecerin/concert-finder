import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Location, LocationRelations, Concert} from '../models';
import {ConcertRepository} from './concert.repository';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.id,
  LocationRelations
> {

  public readonly concerts: HasManyRepositoryFactory<Concert, typeof Location.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ConcertRepository') protected concertRepositoryGetter: Getter<ConcertRepository>,
  ) {
    super(Location, dataSource);
    this.concerts = this.createHasManyRepositoryFactoryFor('concerts', concertRepositoryGetter,);
    this.registerInclusionResolver('concerts', this.concerts.inclusionResolver);
  }
}
