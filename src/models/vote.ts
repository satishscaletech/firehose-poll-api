import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'vote',
  paranoid: true,
  timestamps: false,
  underscored: true,
})
export class Vote extends Model<Vote> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  questionId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  optionId: string;
}
