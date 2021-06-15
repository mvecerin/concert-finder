import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Performer, PerformerRelations, Concert} from '../models';
import {ConcertRepository} from './concert.repository';

export class PerformerRepository extends DefaultCrudRepository<
  Performer,
  typeof Performer.prototype.id,
  PerformerRelations
> {

  public readonly concerts: HasManyRepositoryFactory<Concert, typeof Performer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ConcertRepository') protected concertRepositoryGetter: Getter<ConcertRepository>,
  ) {
    super(Performer, dataSource);
    this.concerts = this.createHasManyRepositoryFactoryFor('concerts', concertRepositoryGetter,);
    this.registerInclusionResolver('concerts', this.concerts.inclusionResolver);
  }
}
