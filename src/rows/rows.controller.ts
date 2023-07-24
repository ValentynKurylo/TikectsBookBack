import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RowsService} from "./rows.service";
import {RowDTO} from "./models/rowDTO";
import {Roles} from "../roles/role.decorator";
import {RolesEnum} from "../roles/roles.enum";
import {RoleGuard} from "../roles/role.guard";
import {AuthGuard} from "../roles/auth.guard";


@Controller('rows')
export class RowsController {
    constructor(private rowService: RowsService) {
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    async post(@Body()body: RowDTO){
        return await this.rowService.post(body)
    }

    @Get()
    async getAll(){
        return await this.rowService.getAll()
    }

    @Get('/:id')
    async getById(@Param('id')id: number){
        return await this.rowService.getById(id)
    }

    @Get('bySectionId/:id')
    async getBySectionId(@Param('id')id: number){
        return await this.rowService.getBySectionId(id)
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Put('/:id')
    async put(@Param('id')id: number, @Body()body: RowDTO){
        return await this.rowService.put(id, body)
    }

    @Roles(RolesEnum.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete('/:id')
    async delete(@Param('id')id: number){
        return await this.rowService.delete(id)
    }
}
