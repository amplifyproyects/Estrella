// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // 'jwt' se usa por defecto
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secreto', // Debe coincidir con la clave de JwtModule
    });
  }

  async validate(payload: any) {
    // Retorna los datos que quedarán adjuntos en req.user
    if (!payload) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, correo: payload.correo };
  }
}