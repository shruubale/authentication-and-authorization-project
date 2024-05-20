import { Module } from '@nestjs/common';
import { User, UserSchema } from './users.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';


@Module({
    imports:[JwtModule.register({
        secret: 'shrutiUbale',
        signOptions: { expiresIn: '1d' },
      }),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      dest:'./uploads'
    })],
    providers:[UsersService],
    controllers:[UsersController]
})

export class UsersModule {}
