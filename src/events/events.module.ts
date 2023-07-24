import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../users/models/users.model";
import {SeatModel} from "../seats/models/seat.model";
import {RowModel} from "../rows/models/rows.model";
import {SectionModel} from "../sections/models/section.model";
import {EventModel} from "./models/event.model";

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    SequelizeModule.forFeature([EventModel, SectionModel, UserModel, SeatModel, RowModel]),
  ]
})
export class EventsModule {}
