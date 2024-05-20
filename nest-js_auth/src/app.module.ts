// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UsersModule } from './users/users.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
// import { BannerModule } from './banner/banner.module';
// import { UsersSeederService } from './users/seeds/userSeed.service';
// import { UserSchema } from './users/users.model';

// @Module({
//   imports: [ServeStaticModule.forRoot({
//     rootPath: join(__dirname, '..', 'uploads'),
//   },
//     {
//       rootPath: join(__dirname, '..', 'banners'),
//     }), MongooseModule.forRoot('mongodb://localhost/authentication_nestJS'), UsersModule, BannerModule,
//     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),],
//   controllers: [AppController],
//   providers: [AppService,UsersSeederService],
// })
// export class AppModule { }





import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BannerModule } from './banner/banner.module';
import { UsersSeederService } from './users/seeds/userSeed.service';
import { UserSchema } from './users/users.model';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      // serveRoot: '/uploads', // You can specify a custom root for your uploads
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'banners'),
      // serveRoot: '/banners', // You can specify a custom root for your banners
    }),
    MongooseModule.forRoot('mongodb://localhost/authentication_nestJS'),
    UsersModule, 
    BannerModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersSeederService],
})
export class AppModule { }

