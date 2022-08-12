import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateHistoryDto {
	@ApiProperty()
	@IsString()
	TeamId?: string;

	@ApiProperty()
	@IsString()
	timestamp?: string;
}
