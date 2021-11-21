import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoDeVehiculo, TipoDeVehiculoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class TipoDeVehiculoRepository extends DefaultCrudRepository<
  TipoDeVehiculo,
  typeof TipoDeVehiculo.prototype.id,
  TipoDeVehiculoRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof TipoDeVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(TipoDeVehiculo, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
