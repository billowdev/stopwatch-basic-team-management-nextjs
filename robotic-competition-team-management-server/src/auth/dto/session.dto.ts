import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SessionDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	id: string;

	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	iat: number;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	exp: number;
}
