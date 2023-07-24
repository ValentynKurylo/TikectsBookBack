import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards} from '@nestjs/common';
import {SeatsService} from "./seats.service";
import {SeatDTO} from "./models/seatDTO";
import {Roles} from "../roles/role.decorator";
import {RolesEnum} from "../roles/roles.enum";
import {RoleGuard} from "../roles/role.guard";
import {AuthGuard} from "../roles/auth.guard";

@Controller('seats')
export class SeatsController {
    constructor(private seatService: SeatsService) {
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    async post(@Body()body: SeatDTO){
        return await this.seatService.post(body)
    }

    @Get()
    async getAll(){
        return await this.seatService.getAll()
    }

    @Get('/:id')
    async getById(@Param('id')id: number){
        return await this.seatService.getById(id)
    }

    @Get('byRowId/:id')
    async getByRowId(@Param('id')id: number){
        return await this.seatService.getSeatByRowId(id)
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Put('/:id')
    async put(@Param('id')id: number, @Body()body: SeatDTO){
        return await this.seatService.put(id, body)
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    async patch(@Param('id')id: number, @Req()req){
        console.log(id)
        console.log('user')
        console.log('user', req.user.id)
        return await this.seatService.patch(id, req.user.id)
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete('/:id')
    async delete(@Param('id')id: number){
        return await this.seatService.delete(id)
    }
}
