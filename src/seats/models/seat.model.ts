import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "../../users/models/users.model";
import {RowModel} from "../../rows/models/rows.model";
import {EventModel} from "../../events/models/event.model";

interface CreateSeatModel {
    name: number,
    isActive: boolean,
    userId: number,
    rowId: number
}

@Table({tableName: "seats"})
export class SeatModel extends Model<SeatModel, CreateSeatModel>{
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    name: number

    @Column({type: DataType.BOOLEAN,  defaultValue: true})
    isActive: boolean

    @ForeignKey(()=>UserModel)
    @Column({type: DataType.INTEGER, defaultValue: null})
    userId: number

    @ForeignKey(()=>RowModel)
    @Column({type: DataType.INTEGER})
    rowId: number

    @BelongsTo(()=>RowModel, { onDelete: 'CASCADE' })
    row: RowModel
}