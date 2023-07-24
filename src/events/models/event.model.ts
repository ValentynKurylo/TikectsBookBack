import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {SectionModel} from "../../sections/models/section.model";

interface CreateEventModel {
    name: string,
    date: string,
    place: string,
    description: string
}

@Table({tableName: "events"})
export class EventModel extends Model<EventModel, CreateEventModel>{
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.DATEONLY})
    date: string

    @Column({type: DataType.STRING})
    place: string

    @Column({type: DataType.TEXT})
    description: string

    @HasMany(()=>SectionModel)
    sections: SectionModel[]
}