
//  Refresh Token Strategy


import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';


export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
   constructor(
     private configService: ConfigService,
     private prisma: PrismaService,
   ) {
     
     super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
         passReqToCallback: true,
     });
   }


  // Validate refresh Token
  async validate(req: Request, payload: { sub: string; email: string }) {
     console.log('RefreshTokenStrategy.validate called')
     console.log('Payload', { sub: payload.sub, email: payload.email });

     const authHeader = req.headers.authorization;
     if (!authHeader) {
        console.log('No Authorization header found');
        throw new UnauthorizedException('Refresh token not provided');
     }

     const refreshToken = authHeader.replace('Bearer', '').trim();
     if (!refreshToken) {
        throw new UnauthorizedException(
          'Refresh token is empty after extraction'
        );
     }

     const user = await this.prisma.user.findUnique({
         where: {id: payload.sub},
         select: {
            id: true,
            email: true,
            role: true,
            refreshToken: true,
         },
     });

     if(!user || !user.refreshToken) {
       throw new UnauthorizedException('Invalid Refresh Token');
     }
}