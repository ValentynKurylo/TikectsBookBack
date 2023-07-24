import { Module } from '@nestjs/common';
import { RowsController } from './rows.controller';
import { RowsService } from './rows.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../users/models/users.model";
import {SeatModel} from "../seats/models/seat.model";
import {RowModel} from "./models/rows.model";
import {SectionModel} from "../sections/models/section.model";
import {EventModel} from "../events/models/event.model";

@Module({
  controllers: [RowsController],
  providers: [RowsService],
  imports: [
    SequelizeModule.forFeature([UserModel, SeatModel, RowModel, SectionModel, EventModel]),
  ]
})
export class RowsModule {}
