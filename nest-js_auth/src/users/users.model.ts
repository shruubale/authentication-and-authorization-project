import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    SUBADMIN = 'subadmin',
  }

interface Permission{
    permissions:string[]
}

@Schema()
export class User extends Document {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @IsOptional()
    @Prop()
    dob: Date;

    @Prop()
    address:string;

    @Prop()
    zipCode:number;

    @IsOptional()
    @Prop()
    file?: string; 

    @Prop()
    otp:number;

    @Prop()
    role: UserRole;

    @Prop({ default: true })
    status:boolean;

    // @IsOptional()
    // @Prop()
    // permissions:Permission;
}

export const UserSchema = SchemaFactory.createForClass(User);