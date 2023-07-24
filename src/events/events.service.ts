import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {EventModel} from "./models/event.model";
import {EventDTO} from "./models/eventDTO";
import {SectionModel} from "../sections/models/section.model";
import {RowModel} from "../rows/models/rows.model";
import {SeatModel} from "../seats/models/seat.model";

@Injectable()
export class EventsService {
    constructor(@InjectModel(EventModel) private eventRepository: typeof EventModel) {
    }

    async post(body: EventDTO){
        return await this.eventRepository.create(body)
    }

    async getAll(){
        return await this.eventRepository.findAll()
    }

    async getAllInformationById(id: number){
        return await this.eventRepository.findAll({where: {id}, include: [SectionModel]})
    }

    async getById(id: number){
        return this.eventRepository.findByPk(id)
    }

    async put(id: number, body: EventDTO){
        return await this.eventRepository.update({...body}, {where:{id}})
    }

    async delete(id: number){
        return await this.eventRepository.destroy({where:{id}})
    }
}
