import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { nombre, contrasena } = loginDto;

    const usuario = await this.usuarioService.findByName(nombre);

    if (!usuario || usuario.contrasena !== contrasena) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario._id.toString(),
      nombre: usuario.nombre,
      rolId: usuario.rolId.toString(),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
