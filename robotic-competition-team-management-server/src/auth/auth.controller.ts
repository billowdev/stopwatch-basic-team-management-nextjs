import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Get, Request, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SessionDto, SignDto } from './dto';
import { UserIsExist, LocalGuard, JwtGuard } from './guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService
	) { }

	@ApiResponse({ type: SignDto })
	@UseGuards(LocalGuard)
	@HttpCode(HttpStatus.OK)
	@Post('signin')
	signin(@Body() dto: AuthDto): Promise<SignDto> {
		return this.authService.signin(dto);
	}

	@UseGuards(UserIsExist)
	@Post('signup')
	signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto);
	}

	@UseGuards(JwtGuard)
	@Get('session')
	session(
		@Request() req: any
	): Promise<SessionDto> {
		try {
			return req.user
		} catch (error) {
			throw new BadRequestException()
		}

	}



}
