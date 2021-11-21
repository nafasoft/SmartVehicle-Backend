import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Usuario, Vehiculo, Codeudor} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {CodeudorRepository} from './codeudor.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Solicitud.prototype.id>;

  public readonly vehiculo: HasOneRepositoryFactory<Vehiculo, typeof Solicitud.prototype.id>;

  public readonly codeudor: HasOneRepositoryFactory<Codeudor, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('CodeudorRepository') protected codeudorRepositoryGetter: Getter<CodeudorRepository>,
  ) {
    super(Solicitud, dataSource);
    this.codeudor = this.createHasOneRepositoryFactoryFor('codeudor', codeudorRepositoryGetter);
    this.registerInclusionResolver('codeudor', this.codeudor.inclusionResolver);
    this.vehiculo = this.createHasOneRepositoryFactoryFor('vehiculo', vehiculoRepositoryGetter);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
