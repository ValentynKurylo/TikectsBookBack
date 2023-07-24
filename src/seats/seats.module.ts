import { Module } from '@nestjs/common';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../users/models/users.model";
import {SeatModel} from "./models/seat.model";
import {RowModel} from "../rows/models/rows.model";
import {SectionModel} from "../sections/models/section.model";
import {EventModel} from "../events/models/event.model";

@Module({
  controllers: [SeatsController],
  providers: [SeatsService],
  imports: [
    SequelizeModule.forFeature([UserModel, SeatModel, RowModel, SectionModel, EventModel]),
  ]
})
export class SeatsModule {}
