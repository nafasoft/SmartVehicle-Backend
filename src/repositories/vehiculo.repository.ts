import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Usuario, Solicitud, TipoDeVehiculo, Ubicacion} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {SolicitudRepository} from './solicitud.repository';
import {TipoDeVehiculoRepository} from './tipo-de-vehiculo.repository';
import {UbicacionRepository} from './ubicacion.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Vehiculo.prototype.id>;

  public readonly solicitud: HasOneRepositoryFactory<Solicitud, typeof Vehiculo.prototype.id>;

  public readonly tipoDeVehiculo: BelongsToAccessor<TipoDeVehiculo, typeof Vehiculo.prototype.id>;

  public readonly ubicacion: BelongsToAccessor<Ubicacion, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('TipoDeVehiculoRepository') protected tipoDeVehiculoRepositoryGetter: Getter<TipoDeVehiculoRepository>, @repository.getter('UbicacionRepository') protected ubicacionRepositoryGetter: Getter<UbicacionRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.ubicacion = this.createBelongsToAccessorFor('ubicacion', ubicacionRepositoryGetter,);
    this.registerInclusionResolver('ubicacion', this.ubicacion.inclusionResolver);
    this.tipoDeVehiculo = this.createBelongsToAccessorFor('tipoDeVehiculo', tipoDeVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoDeVehiculo', this.tipoDeVehiculo.inclusionResolver);
    this.solicitud = this.createHasOneRepositoryFactoryFor('solicitud', solicitudRepositoryGetter);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
