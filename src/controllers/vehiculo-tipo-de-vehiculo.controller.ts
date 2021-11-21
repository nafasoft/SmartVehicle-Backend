import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  TipoDeVehiculo,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoTipoDeVehiculoController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/tipo-de-vehiculo', {
    responses: {
      '200': {
        description: 'TipoDeVehiculo belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoDeVehiculo)},
          },
        },
      },
    },
  })
  async getTipoDeVehiculo(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<TipoDeVehiculo> {
    return this.vehiculoRepository.tipoDeVehiculo(id);
  }
}
