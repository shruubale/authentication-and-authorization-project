
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Banner, BannerSchema } from './banner.model';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';


@Module({
    imports: [MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
    MulterModule.register({
        dest: './uploads/banners'
    })],
    providers:[BannerService],
    controllers:[BannerController]
})
export class BannerModule { }

