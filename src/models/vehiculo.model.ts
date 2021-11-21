import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Solicitud} from './solicitud.model';
import {TipoDeVehiculo} from './tipo-de-vehiculo.model';
import {Ubicacion} from './ubicacion.model';

@model()
export class Vehiculo extends Entity {
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
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'number',
    required: true,
  })
  anio: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  tipoDeOferta: string;

  @property({
    type: 'string',
  })
  fotografia?: string;

  @property({
    type: 'string',
  })
  enlace?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @property({
    type: 'string',
  })
  solicitudId?: string;

  @hasOne(() => Solicitud)
  solicitud: Solicitud;

  @belongsTo(() => TipoDeVehiculo)
  tipoDeVehiculoId: string;

  @belongsTo(() => Ubicacion)
  ubicacionId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
