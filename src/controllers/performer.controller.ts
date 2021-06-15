import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Performer} from '../models';
import {PerformerRepository} from '../repositories';

export class PerformerController {
  constructor(
    @repository(PerformerRepository)
    public performerRepository : PerformerRepository,
  ) {}

  @post('/performers')
  @response(200, {
    description: 'Performer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Performer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Performer, {
            title: 'NewPerformer',
            exclude: ['id'],
          }),
        },
      },
    })
    performer: Omit<Performer, 'id'>,
  ): Promise<Performer> {
    return this.performerRepository.create(performer);
  }

  @get('/performers/count')
  @response(200, {
    description: 'Performer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Performer) where?: Where<Performer>,
  ): Promise<Count> {
    return this.performerRepository.count(where);
  }

  @get('/performers')
  @response(200, {
    description: 'Array of Performer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Performer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Performer) filter?: Filter<Performer>,
  ): Promise<Performer[]> {
    return this.performerRepository.find(filter);
  }

  @patch('/performers')
  @response(200, {
    description: 'Performer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Performer, {partial: true}),
        },
      },
    })
    performer: Performer,
    @param.where(Performer) where?: Where<Performer>,
  ): Promise<Count> {
    return this.performerRepository.updateAll(performer, where);
  }

  @get('/performers/{id}')
  @response(200, {
    description: 'Performer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Performer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Performer, {exclude: 'where'}) filter?: FilterExcludingWhere<Performer>
  ): Promise<Performer> {
    return this.performerRepository.findById(id, filter);
  }

  @patch('/performers/{id}')
  @response(204, {
    description: 'Performer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Performer, {partial: true}),
        },
      },
    })
    performer: Performer,
  ): Promise<void> {
    await this.performerRepository.updateById(id, performer);
  }

  @put('/performers/{id}')
  @response(204, {
    description: 'Performer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() performer: Performer,
  ): Promise<void> {
    await this.performerRepository.replaceById(id, performer);
  }

  @del('/performers/{id}')
  @response(204, {
    description: 'Performer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.performerRepository.deleteById(id);
  }
}
