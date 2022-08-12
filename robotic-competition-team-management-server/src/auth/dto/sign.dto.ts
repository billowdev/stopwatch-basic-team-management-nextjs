import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { UserDto } from 'src/user/dto';

export class SignDto {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  user: UserDto;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
