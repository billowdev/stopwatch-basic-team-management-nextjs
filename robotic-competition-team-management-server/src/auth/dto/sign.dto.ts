import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { UserAttributes } from 'src/user/entities/user.entity';

export class SignDto {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  user: UserAttributes;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
