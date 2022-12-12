import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from './question';

@Table({
  tableName: 'options',
  paranoid: true,
  timestamps: false,
  underscored: true,
})
export class Option extends Model<Option> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  questionId: string;

  @BelongsTo(() => Question)
  question: Question;
}
