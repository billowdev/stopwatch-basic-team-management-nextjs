import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
dotenv.config();

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwtauth') {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWTKEY,
		});
	}

	async validate(payload: any) {
		console.log('====================================');
		console.log('authentication');
		console.log('====================================');
		const user = await this.userService.findOneById(payload.sub);
		if (!user) {
			throw new UnauthorizedException('Unauthorized');
		}
		return payload;
	}
}