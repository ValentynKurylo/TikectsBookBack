import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../users/models/users.model";
import {SeatModel} from "../seats/models/seat.model";
import {RowModel} from "../rows/models/rows.model";
import {SectionModel} from "./models/section.model";
import {EventModel} from "../events/models/event.model";

@Module({
  controllers: [SectionsController],
  providers: [SectionsService],
  imports: [
    SequelizeModule.forFeature([UserModel, SeatModel, RowModel, SectionModel, EventModel]),
  ]
})
export class SectionsModule {}
