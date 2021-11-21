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
  Ubicacion,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoUbicacionController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/ubicacion', {
    responses: {
      '200': {
        description: 'Ubicacion belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ubicacion)},
          },
        },
      },
    },
  })
  async getUbicacion(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Ubicacion> {
    return this.vehiculoRepository.ubicacion(id);
  }
}
