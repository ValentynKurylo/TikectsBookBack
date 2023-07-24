import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RowModel} from "./models/rows.model";
import {RowDTO} from "./models/rowDTO";

@Injectable()
export class RowsService {
    constructor(@InjectModel(RowModel) private rowRepository: typeof RowModel) {
    }

    async post(body: RowDTO){
        return await this.rowRepository.create(body)
    }

    async getAll(){
        return await this.rowRepository.findAll()
    }

    async getById(id: number){
        return this.rowRepository.findByPk(id)
    }

    async getBySectionId(id: number){
        return await this.rowRepository.findAll({where: {sectionId: id}})
    }

    async put(id: number, body: RowDTO){
        return await this.rowRepository.update({...body}, {where:{id}})
    }

    async delete(id: number){
        return await this.rowRepository.destroy({where:{id}})
    }
}
