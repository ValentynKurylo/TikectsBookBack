import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserDTO} from "./models/userDTO";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Post()
    async postUser(@Body() body: UserDTO) {
        const user = await this.userService.postUser(body)
        return user
    }
    @Get()
    async getUsers(){
        return await this.userService.getUsers()
    }

    @Delete('/:id')
    async deleteUser(@Param('id')id: number){
        return await this.userService.deleteUser(id)
    }

}
