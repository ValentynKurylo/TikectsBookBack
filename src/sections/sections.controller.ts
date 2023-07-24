import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {SectionsService} from "./sections.service";
import {SectionDTO} from "./models/sectionDTO";
import {Roles} from "../roles/role.decorator";
import {RolesEnum} from "../roles/roles.enum";
import {RoleGuard} from "../roles/role.guard";
import {AuthGuard} from "../roles/auth.guard";

@Controller('sections')
export class SectionsController {
    constructor(private sectionService: SectionsService) {
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    async post(@Body()event: SectionDTO){
        return await this.sectionService.post(event)
    }

    @Get()
    async getAll(){
        return await this.sectionService.getAll()
    }

    @Get('/:id')
    async getById(@Param('id')id: number){
        return await this.sectionService.getById(id)
    }

    @Get('byEventId/:id')
    async getByEventId(@Param('id')id: number){
        return await this.sectionService.getByEventId(id)
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Put('/:id')
    async put(@Param('id')id: number, @Body()body: SectionDTO){
        return await this.sectionService.put(id, body)
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete('/:id')
    async delete(@Param('id')id: number){
        return await this.sectionService.delete(id)
    }
}
