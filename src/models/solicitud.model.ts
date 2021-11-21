import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Vehiculo} from './vehiculo.model';
import {Codeudor} from './codeudor.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  comentarios?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @hasOne(() => Codeudor)
  codeudor: Codeudor;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
