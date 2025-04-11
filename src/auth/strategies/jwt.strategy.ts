import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '101debad4ad6b28d2aa9bf57f109615fc8f9f12054e9a6184b13f0cb7b225dde!', // Replace with .env in production
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
  
}
