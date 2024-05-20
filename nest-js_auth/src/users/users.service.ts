import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Condition, Model, Types } from 'mongoose';
import { User, UserRole, } from './users.model';
import { SignupUserDto } from './dto/signupUser.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { Query } from 'express-serve-static-core'
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>, private jwtService: JwtService) { }
    //resister User  with file 
    async signupUser(data: SignupUserDto, file?: any): Promise<User> {
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.dob = new Date(data.dob);
        const newUser = await new this.userModel({
            ...data,
            password: hashPassword,
            // file: file.filename
        });

        if(file)
            {
                newUser.file = file.filename;
            }
        console.log(newUser);
        return await newUser.save();
    }


    // get roles
    getUserRoles(): any[] {
        return Object.keys(UserRole).map(key => ({ value: key, viewValue: UserRole[key] }));
    }


    // resister user without file
    // async signupUser(data: SignupUserDto): Promise<User> {
    //     const hashPassword = await bcrypt.hash(data.password, 10);
    //     data.dob = new Date(data.dob);
    //     const newUser = await new this.userModel({
    //         ...data,
    //         password: hashPassword,
    //     });
    //     console.log(newUser);
    //     return await newUser.save();
    // }

    // find user by Email
    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }


    //login User
    async loginUser(body: any): Promise<any> {
        const user = await this.findUserByEmail(body.email);

        console.log(`user found : ${user}`);
        if (!user) return "user not found ";

        const validatePass = await bcrypt.compare(body.password, user.password);
        if (!validatePass) {
            throw new UnauthorizedException('Invalid Credential');
        }
        const payload = { sub: user._id, user: user }
        const token = await this.jwtService.signAsync(payload)

        return { token: token, user: user }
    }


    // update profile without file 

    async updateUserProfile(userId: string, updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: false });

        console.log(user);
        return { user: user };
    }

    // getLogged In user Profile
    async getprofile(id: any) {
        const userId = await this.userModel.findOne({ _id: id })
        return userId;
    }




    // all users with search and pagination
    async getAllUsers(query: Query) {

        let resPerPage: number;
        const currentPage = Number(query.page) || 1
        // const skip =resPerPage * (currentPage-1);
        const limit = 10;
        const keyword: { email?: Condition<string> } = query.keyword ? {
            email: {
                $regex: new RegExp(Array.isArray(query.keyword) ? query.keyword.join("|") : query.keyword as string, 'i'),
            }
        } : {};
        const users = await this.userModel.find({ ...keyword }).limit(resPerPage)
        return users
    }


    async deleteUser(_id: string) {
        return this.userModel.findByIdAndDelete(_id);
    }


    async deleteUsers(ids: any) {
        console.log('IDs received:', ids);
        if (!Array.isArray(ids)) {
            throw new Error('ids must be an array');
        }
        return this.userModel.deleteMany({ _id: { $in: ids } }).exec();
    }




    async refreshToken(req) {
        const token = req.headers.authorization.split(' ')[1];
        const payload = this.jwtService.decode(token);

        // Check if token is still valid
        if (payload.exp - Math.floor(Date.now() / 1000) > 30 * 60) {
            // Token is still valid for more than 30 minutes, no need to refresh
            return;
        }

        // Token is expired or about to expire, refresh token
        const user = await this.userModel.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException('Invalid user');
        }

        const newToken = this.jwtService.sign({ sub: user._id, user: user });
        req.headers.authorization = `Bearer ${newToken}`;
    }

    // forgot password 
    async forgotPassword(updatePassworddto: UpdatePasswordDto) {
        try {
            const user = await this.findUserByEmail(updatePassworddto.email);
            console.log(`user found : ${user}`);
            if (!user) return { message: "Email not exists" };

            if (user) {
                const OTP = this.generateOTP();
                console.log(OTP);

                // Update the user document with the generated OTP
                user.otp = OTP;
                await user.save();

                return { code: OTP, message: "OTP generated and set successfully", user: user };
            }
        } catch (error) {
            console.log(error)
        }

    }


    // without passing the argument 
    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        try {
            const { email, otp, password } = resetPasswordDto;
            console.log(resetPasswordDto);

            const user = await this.userModel.findOne({ email });
            console.log(typeof (user.otp))
            if (!user) {
                return { message: "User not found with this email" };
            }


            if (user.otp != otp) {
                return { message: "Invalid OTP" };
            }

            console.log(password);

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            await user.save();

            return { user: user, message: "Password reset successfully" };
        } catch (error) {
            console.log(error)
        }

    }


    // update user
    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: false });
        console.log(user);
        return user;
    }


    // // update profile without file 

    // async updateUserProfile(userId: string, updateUserDto: UpdateUserDto) {
    //     const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: false });

    //     console.log(user);
    //     return { user: user };
    // }



    // generate OTP
    generateOTP(): number {
        let OTP = 0;
        for (let i = 0; i < 6; i++) {
            const digit = Math.floor(Math.random() * 9) + 1; // Generate a random digit between 1 and 9
            OTP = OTP * 10 + digit; // Append the digit to the number
        }
        return OTP;
    }


    async toggleStatus(id: number) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.status == true) {
            user.status = false;
        } else {
            user.status = true;
        }
        return await user.save();
    }



    // count users
    async getUsersCount() {
        let users = (await this.userModel.find()).length;
        return users
    }

    //count Admin Users

    async getAdminUserCnt() {
        let users = (await this.userModel.find({ role: 'ADMIN' })).length;
        return users;
    }

    // count User role Users
    async getUserRoleCnt() {
        let users = (await this.userModel.find({ role: 'USER' })).length;
        return users;
    }

    // count Active users
    async getActiveUsersCnt() {
        let users = (await this.userModel.find({ status: true })).length;
        return users;
    }
}

