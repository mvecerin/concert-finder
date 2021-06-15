import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Concert,
  Location,
} from '../models';
import {ConcertRepository} from '../repositories';

export class ConcertLocationController {
  constructor(
    @repository(ConcertRepository)
    public concertRepository: ConcertRepository,
  ) { }

  @get('/concerts/{id}/location', {
    responses: {
      '200': {
        description: 'Location belonging to Concert',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Location)},
          },
        },
      },
    },
  })
  async getLocation(
    @param.path.string('id') id: typeof Concert.prototype.id,
  ): Promise<Location> {
    return this.concertRepository.location(id);
  }
}
