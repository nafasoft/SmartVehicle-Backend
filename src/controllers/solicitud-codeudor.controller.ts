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
  Solicitud,
  Codeudor,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudCodeudorController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/codeudor', {
    responses: {
      '200': {
        description: 'Solicitud has one Codeudor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Codeudor),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Codeudor>,
  ): Promise<Codeudor> {
    return this.solicitudRepository.codeudor(id).get(filter);
  }

  @post('/solicituds/{id}/codeudor', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Codeudor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Codeudor, {
            title: 'NewCodeudorInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) codeudor: Omit<Codeudor, 'id'>,
  ): Promise<Codeudor> {
    return this.solicitudRepository.codeudor(id).create(codeudor);
  }

  @patch('/solicituds/{id}/codeudor', {
    responses: {
      '200': {
        description: 'Solicitud.Codeudor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Codeudor, {partial: true}),
        },
      },
    })
    codeudor: Partial<Codeudor>,
    @param.query.object('where', getWhereSchemaFor(Codeudor)) where?: Where<Codeudor>,
  ): Promise<Count> {
    return this.solicitudRepository.codeudor(id).patch(codeudor, where);
  }

  @del('/solicituds/{id}/codeudor', {
    responses: {
      '200': {
        description: 'Solicitud.Codeudor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Codeudor)) where?: Where<Codeudor>,
  ): Promise<Count> {
    return this.solicitudRepository.codeudor(id).delete(where);
  }
}
