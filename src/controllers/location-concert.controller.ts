import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Location,
  Concert,
} from '../models';
import {LocationRepository} from '../repositories';

export class LocationConcertController {
  constructor(
    @repository(LocationRepository) protected locationRepository: LocationRepository,
  ) { }

  @get('/locations/{id}/concerts', {
    responses: {
      '200': {
        description: 'Array of Location has many Concert',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Concert)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Concert>,
  ): Promise<Concert[]> {
    return this.locationRepository.concerts(id).find(filter);
  }

  @post('/locations/{id}/concerts', {
    responses: {
      '200': {
        description: 'Location model instance',
        content: {'application/json': {schema: getModelSchemaRef(Concert)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Location.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Concert, {
            title: 'NewConcertInLocation',
            exclude: ['id'],
            optional: ['locationId']
          }),
        },
      },
    }) concert: Omit<Concert, 'id'>,
  ): Promise<Concert> {
    return this.locationRepository.concerts(id).create(concert);
  }

  @patch('/locations/{id}/concerts', {
    responses: {
      '200': {
        description: 'Location.Concert PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Concert, {partial: true}),
        },
      },
    })
    concert: Partial<Concert>,
    @param.query.object('where', getWhereSchemaFor(Concert)) where?: Where<Concert>,
  ): Promise<Count> {
    return this.locationRepository.concerts(id).patch(concert, where);
  }

  @del('/locations/{id}/concerts', {
    responses: {
      '200': {
        description: 'Location.Concert DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Concert)) where?: Where<Concert>,
  ): Promise<Count> {
    return this.locationRepository.concerts(id).delete(where);
  }
}
