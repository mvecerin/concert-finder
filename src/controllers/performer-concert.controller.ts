import {authenticate} from '@loopback/authentication';
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
import {Concert, Performer} from '../models';
import {PerformerRepository} from '../repositories';

@authenticate('jwt')
export class PerformerConcertController {
  constructor(
    @repository(PerformerRepository)
    protected performerRepository: PerformerRepository,
  ) {}

  @get('/performers/{id}/concerts', {
    responses: {
      '200': {
        description: 'Array of Performer has many Concert',
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
    return this.performerRepository.concerts(id).find(filter);
  }

  @post('/performers/{id}/concerts', {
    responses: {
      '200': {
        description: 'Performer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Concert)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Performer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Concert, {
            title: 'NewConcertInPerformer',
            exclude: ['id'],
            optional: ['performerId'],
          }),
        },
      },
    })
    concert: Omit<Concert, 'id'>,
  ): Promise<Concert> {
    return this.performerRepository.concerts(id).create(concert);
  }

  @patch('/performers/{id}/concerts', {
    responses: {
      '200': {
        description: 'Performer.Concert PATCH success count',
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
    @param.query.object('where', getWhereSchemaFor(Concert))
    where?: Where<Concert>,
  ): Promise<Count> {
    return this.performerRepository.concerts(id).patch(concert, where);
  }

  @del('/performers/{id}/concerts', {
    responses: {
      '200': {
        description: 'Performer.Concert DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Concert))
    where?: Where<Concert>,
  ): Promise<Count> {
    return this.performerRepository.concerts(id).delete(where);
  }
}
