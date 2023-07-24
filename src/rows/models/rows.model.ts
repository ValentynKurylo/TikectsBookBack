import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {SectionModel} from "../../sections/models/section.model";
import {SeatModel} from "../../seats/models/seat.model";
import {EventModel} from "../../events/models/event.model";

interface CreateRowModel {
    name: number,
    sectionId: number
}

@Table({tableName: "rows"})
export class RowModel extends Model<RowModel, CreateRowModel>{
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    name: number

    @ForeignKey(()=>SectionModel)
    @Column({type: DataType.INTEGER})
    sectionId: number

    @BelongsTo(()=>SectionModel, { onDelete: 'CASCADE' })
    section: SectionModel

    @HasMany(()=>SeatModel)
    seats: SeatModel[]
}