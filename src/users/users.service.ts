import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./models/users.model";
import {UserDTO} from "./models/userDTO";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {
    }

    async postUser(body: UserDTO){
        return await this.userRepository.create(body)
    }

    async getUsers(){
        return await this.userRepository.findAll({attributes: {exclude: ['password']}})
    }

    async getUserByEmail(email: string){
        return await this.userRepository.findOne({where: {email}})
    }

    async deleteUser(id: number){
        return await this.userRepository.destroy({where:{id}})
    }

}
