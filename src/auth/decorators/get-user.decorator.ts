import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user; // Inyectado por JwtStrategy al pasar JwtAuthGuard

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    return data ? user[data] : user;
  },
);