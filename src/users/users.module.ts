import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UserModel} from "./models/users.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModule} from "../auth/auth.module";
import {SeatModel} from "../seats/models/seat.model";
import {RowModel} from "../rows/models/rows.model";
import {SectionModel} from "../sections/models/section.model";
import {EventModel} from "../events/models/event.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    SequelizeModule.forFeature([UserModel, SeatModel, RowModel, SectionModel, EventModel]),
    forwardRef(()=>AuthModule)
  ]
})
export class UsersModule {}
