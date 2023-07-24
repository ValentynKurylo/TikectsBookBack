import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {RolesEnum} from '../../roles/roles.enum'
import {SeatModel} from "../../seats/models/seat.model";

interface CreateUserModel {
    fullName: string,
    email: string,
    password: string
}

@Table({tableName: "users"})
export class UserModel extends Model<UserModel, CreateUserModel>{
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    fullName: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @Column({type: DataType.ENUM(String(RolesEnum.USER), String(RolesEnum.ADMIN)), defaultValue: RolesEnum.USER})
    role: RolesEnum

    @HasMany(()=>SeatModel)
    seats: SeatModel[]
}