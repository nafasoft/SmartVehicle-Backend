import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class TipoDeVehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  participacion: number;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<TipoDeVehiculo>) {
    super(data);
  }
}

export interface TipoDeVehiculoRelations {
  // describe navigational properties here
}

export type TipoDeVehiculoWithRelations = TipoDeVehiculo & TipoDeVehiculoRelations;
