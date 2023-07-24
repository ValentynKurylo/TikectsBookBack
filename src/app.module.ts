import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {SequelizeModule} from "@nestjs/sequelize";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {UserModel} from "./users/models/users.model";
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { SectionsModule } from './sections/sections.module';
import { RowsModule } from './rows/rows.module';
import { SeatsModule } from './seats/seats.module';
import {EventModel} from "./events/models/event.model";
import {SectionModel} from "./sections/models/section.model";
import {RowModel} from "./rows/models/rows.model";
import {SeatModel} from "./seats/models/seat.model";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
      ConfigModule.forRoot({
    envFilePath: '.env'
  }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [UserModel, EventModel, SectionModel, RowModel, SeatModel],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    EventsModule,
    SectionsModule,
    RowsModule,
    SeatsModule,
  ],
})
export class AppModule {}
