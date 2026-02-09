import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RolService } from 'src/rol/rol.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly rolService: RolService,
    private readonly jwtService: JwtService,
  ) {}

async login(loginDto: LoginDto) {
  const { nombre, contrasena } = loginDto;

  const usuario = await this.usuarioService.findByName(nombre);

  if (!usuario) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  console.log('ROL.TOSTRING():', usuario.rolId.toString());
  const usuarioRol = await this.rolService.findOne(usuario.rolId.toString());
  console.log('ROL:', usuarioRol);

  const passwordOk = await bcrypt.compare(
    contrasena,
    usuario.contrasena,
  );

  if (!passwordOk) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  const payload = {
    sub: usuario._id.toString(),
    nombre: usuario.nombre,
    rol: usuarioRol?.nombre,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}

}
