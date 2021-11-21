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
  Ubicacion,
  Vehiculo,
} from '../models';
import {UbicacionRepository} from '../repositories';

export class UbicacionVehiculoController {
  constructor(
    @repository(UbicacionRepository) protected ubicacionRepository: UbicacionRepository,
  ) { }

  @get('/ubicacions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Ubicacion has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.ubicacionRepository.vehiculos(id).find(filter);
  }

  @post('/ubicacions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Ubicacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ubicacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInUbicacion',
            exclude: ['id'],
            optional: ['ubicacionId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.ubicacionRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/ubicacions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Ubicacion.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.ubicacionRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/ubicacions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Ubicacion.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.ubicacionRepository.vehiculos(id).delete(where);
  }
}
