import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(@repository(UsuarioRepository) public usuarioRepository:UsuarioRepository) {}

  /*
   * Add service methods here
   */

  GenerarPassword(){
    let clave = generador(8,false);
    return clave;
  }

  CifrarPassword(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarUsuario(usuario:string, clave:string){
    try{

      let p = this.usuarioRepository.findOne({where:{email:usuario, password:clave}})
      if(p){
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(Usuario: Usuario){
    let token = jwt.sign({
      data:{
        id: Usuario.id,
        nombres: Usuario.nombres + " " + Usuario.apellidos,
        email: Usuario.email,
      },
    },
      Llaves.claveJWT);
    return token;
  }

  validarTokenJWT(token: string){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT)
      return datos;
    } catch {
      return false;
    }

  }

}

