import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Option } from './option';

@Table({
  tableName: 'questions',
  paranoid: true,
  underscored: true,
  timestamps: false,
})
export class Question extends Model<Question> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @HasMany(() => Option)
  options: Option[];
}
