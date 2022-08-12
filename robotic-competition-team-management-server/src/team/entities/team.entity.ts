import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	Table,
	Model,
	DataType,
	HasMany,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { History } from 'src/history/entities/history.entity';

@Table({
	tableName: 'teams',
})
export class Team extends Model<Team> {
	@ApiProperty()
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		allowNull: false,
		primaryKey: true,
	})
	id: string

	@ApiProperty()
	@Column({
		type: DataType.STRING(),
		unique: true,
		allowNull: false,
	})
	name: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(),
		allowNull: false,
	})
	school: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(),
	})
	number: string;

	@HasMany(() => History)
	histories: History[]
}
