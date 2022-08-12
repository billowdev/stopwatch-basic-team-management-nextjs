import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
	Column,
	Table,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { Team } from 'src/team/entities/team.entity';

@Table({
	tableName: 'histories',
})
export class History extends Model<History> {
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
		allowNull: false,
	})
	timestamp: string;


	@BelongsTo(() => Team, {onDelete: 'casCade'})
	team: Team

	@ForeignKey(() => Team)
	@Column({
		type: DataType.UUID,
	})
	TeamId: string;
}
