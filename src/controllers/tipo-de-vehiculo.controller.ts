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
import {TipoDeVehiculo} from '../models';
import {TipoDeVehiculoRepository} from '../repositories';

export class TipoDeVehiculoController {
  constructor(
    @repository(TipoDeVehiculoRepository)
    public tipoDeVehiculoRepository : TipoDeVehiculoRepository,
  ) {}

  @post('/tipo-de-vehiculos')
  @response(200, {
    description: 'TipoDeVehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoDeVehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDeVehiculo, {
            title: 'NewTipoDeVehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoDeVehiculo: Omit<TipoDeVehiculo, 'id'>,
  ): Promise<TipoDeVehiculo> {
    return this.tipoDeVehiculoRepository.create(tipoDeVehiculo);
  }

  @get('/tipo-de-vehiculos/count')
  @response(200, {
    description: 'TipoDeVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoDeVehiculo) where?: Where<TipoDeVehiculo>,
  ): Promise<Count> {
    return this.tipoDeVehiculoRepository.count(where);
  }

  @get('/tipo-de-vehiculos')
  @response(200, {
    description: 'Array of TipoDeVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoDeVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoDeVehiculo) filter?: Filter<TipoDeVehiculo>,
  ): Promise<TipoDeVehiculo[]> {
    return this.tipoDeVehiculoRepository.find(filter);
  }

  @patch('/tipo-de-vehiculos')
  @response(200, {
    description: 'TipoDeVehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDeVehiculo, {partial: true}),
        },
      },
    })
    tipoDeVehiculo: TipoDeVehiculo,
    @param.where(TipoDeVehiculo) where?: Where<TipoDeVehiculo>,
  ): Promise<Count> {
    return this.tipoDeVehiculoRepository.updateAll(tipoDeVehiculo, where);
  }

  @get('/tipo-de-vehiculos/{id}')
  @response(200, {
    description: 'TipoDeVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoDeVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoDeVehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoDeVehiculo>
  ): Promise<TipoDeVehiculo> {
    return this.tipoDeVehiculoRepository.findById(id, filter);
  }

  @patch('/tipo-de-vehiculos/{id}')
  @response(204, {
    description: 'TipoDeVehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDeVehiculo, {partial: true}),
        },
      },
    })
    tipoDeVehiculo: TipoDeVehiculo,
  ): Promise<void> {
    await this.tipoDeVehiculoRepository.updateById(id, tipoDeVehiculo);
  }

  @put('/tipo-de-vehiculos/{id}')
  @response(204, {
    description: 'TipoDeVehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoDeVehiculo: TipoDeVehiculo,
  ): Promise<void> {
    await this.tipoDeVehiculoRepository.replaceById(id, tipoDeVehiculo);
  }

  @del('/tipo-de-vehiculos/{id}')
  @response(204, {
    description: 'TipoDeVehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoDeVehiculoRepository.deleteById(id);
  }
}
