import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {EventModel} from "../../events/models/event.model";
import {RowModel} from "../../rows/models/rows.model";

interface CreateSectionModel {
    name: string,
    price: number,
    eventId: number
}

@Table({tableName: "sections"})
export class SectionModel extends Model<SectionModel, CreateSectionModel>{
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.INTEGER})
    price: number

    @ForeignKey(()=>EventModel)
    @Column({type: DataType.INTEGER})
    eventId: number

    @BelongsTo(()=>EventModel, { onDelete: 'CASCADE' })
    event: EventModel

    @HasMany(()=>RowModel)
    rows: RowModel[]
}