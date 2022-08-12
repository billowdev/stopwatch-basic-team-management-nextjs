import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
	Column,
	Table,
	Model,
	DataType,
} from 'sequelize-typescript';

@Table({
	tableName: 'users',
})
export class User extends Model<User> {
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
		type: DataType.STRING(150),
		unique: true,
		allowNull: false,
	})
	username: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
		allowNull: false,
	})
	password: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
	})
	name: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
	})
	surname: string;
}
