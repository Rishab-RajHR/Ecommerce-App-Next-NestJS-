//  Refresh Token Strategy


import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExtractJwt } from 'passport-jwt';



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
}