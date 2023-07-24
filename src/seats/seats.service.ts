import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {SeatModel} from "./models/seat.model";
import {SeatDTO} from "./models/seatDTO";

@Injectable()
export class SeatsService {
    constructor(@InjectModel(SeatModel) private seatRepository: typeof SeatModel) {
    }

    async post(body: SeatDTO){
        return await this.seatRepository.create(body)
    }

    async getAll(){
        return await this.seatRepository.findAll()
    }

    async getById(id: number){
        return this.seatRepository.findByPk(id)
    }

    async getSeatByRowId(id: number){
        return await this.seatRepository.findAll({where: {rowId: id}})
    }

    async put(id: number, body: SeatDTO){
        return await this.seatRepository.update({...body}, {where:{id}})
    }

    async patch(id: number, userId){
        return this.seatRepository.update({userId: userId, isActive: false}, {where: {id}})
    }

    async delete(id: number){
        return await this.seatRepository.destroy({where:{id}})
    }
}
