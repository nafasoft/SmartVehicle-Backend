import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ubicacion, UbicacionRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class UbicacionRepository extends DefaultCrudRepository<
  Ubicacion,
  typeof Ubicacion.prototype.id,
  UbicacionRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Ubicacion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Ubicacion, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
