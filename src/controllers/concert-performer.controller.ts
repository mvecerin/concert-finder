import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Concert, Performer} from '../models';
import {ConcertRepository} from '../repositories';

@authenticate('jwt')
export class ConcertPerformerController {
  constructor(
    @repository(ConcertRepository)
    public concertRepository: ConcertRepository,
  ) {}

  @get('/concerts/{id}/performer', {
    responses: {
      '200': {
        description: 'Performer belonging to Concert',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Performer)},
          },
        },
      },
    },
  })
  async getPerformer(
    @param.path.string('id') id: typeof Concert.prototype.id,
  ): Promise<Performer> {
    return this.concertRepository.performer(id);
  }
}
