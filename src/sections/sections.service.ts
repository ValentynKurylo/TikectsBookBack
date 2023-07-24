import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {SectionModel} from "./models/section.model";
import {SectionDTO} from "./models/sectionDTO";


@Injectable()
export class SectionsService {
    constructor(@InjectModel(SectionModel) private sectionRepository: typeof SectionModel) {
    }

    async post(body: SectionDTO){
        return await this.sectionRepository.create(body)
    }

    async getAll(){
        return await this.sectionRepository.findAll()
    }

    async getById(id: number){
        return this.sectionRepository.findByPk(id)
    }

    async getByEventId(id: number){
        return await this.sectionRepository.findAll({where: {eventId: id}})
    }

    async put(id: number, body: SectionDTO){
        return await this.sectionRepository.update({...body}, {where:{id}})
    }

    async delete(id: number){
        return await this.sectionRepository.destroy({where:{id}})
    }
}
