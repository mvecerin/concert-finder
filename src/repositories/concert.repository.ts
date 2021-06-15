import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Concert, ConcertRelations, Location, Performer} from '../models';
import {LocationRepository} from './location.repository';
import {PerformerRepository} from './performer.repository';

export class ConcertRepository extends DefaultCrudRepository<
  Concert,
  typeof Concert.prototype.id,
  ConcertRelations
> {
  public readonly location: BelongsToAccessor<
    Location,
    typeof Concert.prototype.id
  >;

  public readonly performer: BelongsToAccessor<
    Performer,
    typeof Concert.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('LocationRepository')
    protected locationRepositoryGetter: Getter<LocationRepository>,
    @repository.getter('PerformerRepository')
    protected performerRepositoryGetter: Getter<PerformerRepository>,
  ) {
    super(Concert, dataSource);
    this.performer = this.createBelongsToAccessorFor(
      'performer',
      performerRepositoryGetter,
    );
    this.registerInclusionResolver(
      'performer',
      this.performer.inclusionResolver,
    );
    this.location = this.createBelongsToAccessorFor(
      'location',
      locationRepositoryGetter,
    );
    this.registerInclusionResolver('location', this.location.inclusionResolver);
  }
}
