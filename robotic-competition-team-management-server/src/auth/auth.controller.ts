import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAttributes } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto, SessionDto, SignDto } from './dto';
import { JwtAuthGuard, LocalGuard, UserIsExist } from './guards';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@ApiResponse({ type: SignDto })
	@UseGuards(LocalGuard)
	@HttpCode(HttpStatus.OK)
	@Post('signin')
	signin(@Body() dto: AuthDto): Promise<SignDto> {
		return this.authService.signin(dto);
	}

	@ApiResponse({ type: UserAttributes })
	@UseGuards(UserIsExist)
	@Post('signup')
	signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto);
	}

	@UseGuards(JwtAuthGuard)
	// @ApiResponse({ type: SessionDto })
	@Get('session')
	session(
		@Request() req: any
	): Promise<any> {
		try {
			console.log('====================================');
			console.log('get session');
			console.log('====================================');
			return req.user
		} catch (error) {
			throw new BadRequestException()
			}
		}
}
