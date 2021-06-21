import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Concert} from '../models';
import {ConcertRepository} from '../repositories';

// const RESOURCE_NAME = 'concert';
// const ACL = {
//   'edit': {
//     resource: `${RESOURCE_NAME}*`,
//     scopes: ['edit'],
//     allowedRoles: ['owner'],
//     voters: [assignProjectInstanceId],
//   }
// };

@authenticate()
export class ConcertController {
  constructor(
    @repository(ConcertRepository)
    public concertRepository: ConcertRepository,
  ) {}

  @post('/concerts')
  @response(200, {
    description: 'Concert model instance',
    content: {'application/json': {schema: getModelSchemaRef(Concert)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Concert, {
            title: 'NewConcert',
            exclude: ['id'],
          }),
        },
      },
    })
    concert: Omit<Concert, 'id'>,
  ): Promise<Concert> {
    return this.concertRepository.create(concert);
  }

  @get('/concerts/count')
  @response(200, {
    description: 'Concert model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Concert) where?: Where<Concert>): Promise<Count> {
    return this.concertRepository.count(where);
  }

  @get('/concerts')
  @response(200, {
    description: 'Array of Concert model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Concert, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Concert) filter?: Filter<Concert>,
  ): Promise<Concert[]> {
    return this.concertRepository.find(filter);
  }

  @patch('/concerts')
  @response(200, {
    description: 'Concert PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Concert, {partial: true}),
        },
      },
    })
    concert: Concert,
    @param.where(Concert) where?: Where<Concert>,
  ): Promise<Count> {
    return this.concertRepository.updateAll(concert, where);
  }

  @get('/concerts/{id}')
  @response(200, {
    description: 'Concert model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Concert, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Concert, {exclude: 'where'})
    filter?: FilterExcludingWhere<Concert>,
  ): Promise<Concert> {
    return this.concertRepository.findById(id, filter);
  }

  @patch('/concerts/{id}')
  @response(204, {
    description: 'Concert PATCH success',
  })
  // @authorize(ACL.edit)
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Concert, {partial: true}),
        },
      },
    })
    concert: Concert,
  ): Promise<void> {
    await this.concertRepository.updateById(id, concert);
  }

  @put('/concerts/{id}')
  @response(204, {
    description: 'Concert PUT success',
  })
  // @authorize({voters: [basicAuthorization]})
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() concert: Concert,
  ): Promise<void> {
    await this.concertRepository.replaceById(id, concert);
  }

  @del('/concerts/{id}')
  @response(204, {
    description: 'Concert DELETE success',
  })
  // @authorize({voters: [basicAuthorization]})
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.concertRepository.deleteById(id);
  }
}
