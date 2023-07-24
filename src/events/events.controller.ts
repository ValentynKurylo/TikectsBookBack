import {Body, Controller, Post, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import {EventsService} from "./events.service";
import {EventDTO} from "./models/eventDTO";
import {RoleGuard} from "../roles/role.guard";
import {Roles} from "../roles/role.decorator";
import {RolesEnum} from "../roles/roles.enum";
import {AuthGuard} from "../roles/auth.guard";

@Controller('events')
export class EventsController {
    constructor(private eventService: EventsService) {
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    async post(@Body()event: EventDTO){
        return await this.eventService.post(event)
    }

    @Get()
    async getAll(){
        return await this.eventService.getAll()
    }

    @Get('/:id')
    async getById(@Param('id')id: number){
        return await this.eventService.getById(id)
    }

    @Get('all/:id')
    async getAllInformationById(@Param('id')id: number){
        return await this.eventService.getAllInformationById(id)
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Put('/:id')
    async put(@Param('id')id: number, @Body()body: EventDTO){
        return await this.eventService.put(id, body)
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete('/:id')
    async delete(@Param('id')id: number){
        return await this.eventService.delete(id)
    }
}
