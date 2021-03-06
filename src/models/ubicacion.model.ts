import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Ubicacion extends Entity {
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
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;
  
  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Ubicacion>) {
    super(data);
  }
}

export interface UbicacionRelations {
  // describe navigational properties here
}

export type UbicacionWithRelations = Ubicacion & UbicacionRelations;
