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
  TipoDeVehiculo,
  Vehiculo,
} from '../models';
import {TipoDeVehiculoRepository} from '../repositories';

export class TipoDeVehiculoVehiculoController {
  constructor(
    @repository(TipoDeVehiculoRepository) protected tipoDeVehiculoRepository: TipoDeVehiculoRepository,
  ) { }

  @get('/tipo-de-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of TipoDeVehiculo has many Vehiculo',
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
    return this.tipoDeVehiculoRepository.vehiculos(id).find(filter);
  }

  @post('/tipo-de-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'TipoDeVehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoDeVehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInTipoDeVehiculo',
            exclude: ['id'],
            optional: ['tipoDeVehiculoId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.tipoDeVehiculoRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/tipo-de-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'TipoDeVehiculo.Vehiculo PATCH success count',
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
    return this.tipoDeVehiculoRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/tipo-de-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'TipoDeVehiculo.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.tipoDeVehiculoRepository.vehiculos(id).delete(where);
  }
}
