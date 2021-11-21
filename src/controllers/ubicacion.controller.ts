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
import {Ubicacion} from '../models';
import {UbicacionRepository} from '../repositories';

export class UbicacionController {
  constructor(
    @repository(UbicacionRepository)
    public ubicacionRepository : UbicacionRepository,
  ) {}

  @post('/ubicaciones')
  @response(200, {
    description: 'Ubicacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ubicacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ubicacion, {
            title: 'NewUbicacion',
            exclude: ['id'],
          }),
        },
      },
    })
    ubicacion: Omit<Ubicacion, 'id'>,
  ): Promise<Ubicacion> {
    return this.ubicacionRepository.create(ubicacion);
  }

  @get('/ubicaciones/count')
  @response(200, {
    description: 'Ubicacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ubicacion) where?: Where<Ubicacion>,
  ): Promise<Count> {
    return this.ubicacionRepository.count(where);
  }

  @get('/ubicaciones')
  @response(200, {
    description: 'Array of Ubicacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ubicacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ubicacion) filter?: Filter<Ubicacion>,
  ): Promise<Ubicacion[]> {
    return this.ubicacionRepository.find(filter);
  }

  @patch('/ubicaciones')
  @response(200, {
    description: 'Ubicacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ubicacion, {partial: true}),
        },
      },
    })
    ubicacion: Ubicacion,
    @param.where(Ubicacion) where?: Where<Ubicacion>,
  ): Promise<Count> {
    return this.ubicacionRepository.updateAll(ubicacion, where);
  }

  @get('/ubicaciones/{id}')
  @response(200, {
    description: 'Ubicacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ubicacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ubicacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Ubicacion>
  ): Promise<Ubicacion> {
    return this.ubicacionRepository.findById(id, filter);
  }

  @patch('/ubicaciones/{id}')
  @response(204, {
    description: 'Ubicacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ubicacion, {partial: true}),
        },
      },
    })
    ubicacion: Ubicacion,
  ): Promise<void> {
    await this.ubicacionRepository.updateById(id, ubicacion);
  }

  @put('/ubicaciones/{id}')
  @response(204, {
    description: 'Ubicacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ubicacion: Ubicacion,
  ): Promise<void> {
    await this.ubicacionRepository.replaceById(id, ubicacion);
  }

  @del('/ubicaciones/{id}')
  @response(204, {
    description: 'Ubicacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ubicacionRepository.deleteById(id);
  }
}
