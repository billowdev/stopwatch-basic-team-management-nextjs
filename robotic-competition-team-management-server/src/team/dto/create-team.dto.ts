import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTeamDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	school: string;

	@ApiProperty()
	@IsString()
	number: string;
}
