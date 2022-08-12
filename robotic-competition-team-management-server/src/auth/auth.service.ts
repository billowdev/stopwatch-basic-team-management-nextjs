import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	// generate token
	private async generateToken(user) {
		const token = await this.jwtService.signAsync(user);
		return token
	}

	// password hasing
	private async hashPassword(password) {
		const hash = await bcrypt.hash(password, 10);
		return hash;
	}

	// check password
	private async comparePassword(password, dbPassword) {
		const match = await bcrypt.compare(password, dbPassword);
		return match;
	}

	// validate authentication
	public async validateUser(username: string, pass: string) {
		const user = await this.userService.findOneByUsername(username);
		if (!user) {
			return null;
		}

		const match = await this.comparePassword(pass, user.password);
		if (!match) {
			return null;
		}
		const result = user['dataValues']
		delete result.password
		return result;
	}

	// service for auth controller

	// signin : login service
	public async signin(user): Promise<SignDto> {
		try {
			const { id, role, shopName } = await this.userService.findOneByUsername(user.username)
			delete user.password
			const token = await this.generateToken({ sub: id, role });
			const resp = { user: { id, role, shopName, ...user }, token }
			return resp
		} catch (error) {
			throw new BadRequestException()
		}

	}

	// signup : register service
	public async signup(user): Promise<SignDto> {
		try {
			const hassPassword = await this.hashPassword(user.password);
			const result = await this.userService.createAccount({ ...user, password: hassPassword });
			delete result['dataValues'].password
			const payload = {
				sub: result['dataValues'].id,
				role: result['dataValues'].role
			}
			const token = await this.generateToken(payload);
			return { user: result, token };
		} catch (error) {
			console.error(error)
			throw new BadRequestException()
		}
	}


}
