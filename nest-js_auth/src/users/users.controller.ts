import { Body, Controller, Post, Res, UseGuards, Get, Req, Request, Put, Param, HttpException, Patch, UploadedFile, UseInterceptors, Query, Delete, UsePipes, ValidationPipe, NotFoundException, } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signupUser.dto';
import { Response } from 'express';
import { AuthGuard } from './auth/auth.guard';
import { SigninUserDto } from './dto/SigninUser.dto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import mongoose from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { log } from 'console';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';


@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @Post('/signup')
    // async signupUser(@Body() signupUserDto: SignupUserDto, @Res() response: Response) {
    //     const newUser = await this.usersService.signupUser(signupUserDto);
    //     return response.status(201).json({ message: "User Resistered Successfully in NestJs", User: newUser })
    // }




    // signup with file
    @Post('/signup')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = name.split(' ').join("_") + '_' + Date.now() + '.' + fileExtension;

                cb(null, newFileName);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(null, false);
            }
            cb(null, true)
        }
    }))
    async registerUser(@UploadedFile() file: Express.Multer.File, @Body() signupUserDto: SignupUserDto,): Promise<any> {
        return this.usersService.signupUser(signupUserDto, file);
    }


    //signup user without file upload
    // @Post('/signup')
    // async registerUser(@Body() signupUserDto: SignupUserDto,): Promise<any> {
    //     return this.usersService.signupUser(signupUserDto);
    // }



    // profile dashboard
    @UseGuards(AuthGuard)
    @Get('/auth/profile')
    getProfile(@Request() req) {
        // this.usersService.getUpdatedUserProfile(req._Id);
        return req.user;
    }

    @Get('user/profile')
    getUpdatedUserProfile() {

    }


    //  get roles dropdownlist
    @Get('/roles')
    async getUserRoles() {
        return this.usersService.getUserRoles();
    }


    @Post("/login")
    async loginUser(@Body() data: SigninUserDto, @Res() res: Response) {
        const dataa = await this.usersService.loginUser(data);
        return res.status(200).json({ message: "User Logged In Successfully nestJS", dataa })
    }


    // update user controller without file
    @Put('/update/profile/:id')
    async updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("ObjectId is not valid", 400);
        let updatedUser = await this.usersService.updateUserProfile(id, updateUserDto,)
        if (!updatedUser) throw new HttpException("User not found", 400);
        return res.status(200).json({ message: "Profile Updated Successfully in NestJS", user: updatedUser })
    }

    // // get all users 
    // @Get('/allUsers')
    // async getUsers(@Res() res: Response)
    // {

    //         // Handle the returned users object here
    //         return this.usersService.getAllUsers();;

    // }

    // get all users without pagination and sorting
    // @Get('/allUsers')
    // async getUsers()
    // {
    //     return  this.usersService.getAllUsers();
    // }

    // //get all users using paggination and sorting 
    // @Get('/allUsers')
    // async getUsers(@Query('page') page,
    //     @Query('limit') limit, @Query('sortBy')
    //     @Query('sortOrder') sortOrder: string = 'asc') {
    //     return this.usersService.getAllUsers(page, limit,sortOrder);
    // }


    //get all users using paggination and searching
    @Get('/allUsers')
    async getUsers(@Query() query) {
        return this.usersService.getAllUsers(query);
    }


    //  @Get()
    // async getAllUsers(@Query() query) {
    //     return this.usersService.getAllUsers(query);
    // }

    @UseGuards(AuthGuard)
    @Get('/updated/user')
    async getUserProfile(@Request() req) {
        return await this.usersService.getprofile(req.user._id);
    }

    // update user controller with file
    // @Put('/update/profile/:id')
    // async updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    //     const isValid = mongoose.Types.ObjectId.isValid(id);
    //     if (!isValid) throw new HttpException("ObjectId is not valid", 400);
    //     let updatedUser = await this.usersService.updateUserProfile(id, updateUserDto ,file)
    //     if (!updatedUser) throw new HttpException("User not found", 400);
    //     return res.status(200).json({ message: "Profile Updated Successfully in NestJS", user: updatedUser })
    // }

    @Get('/generate-otp')
    async otpgeneration() {
        return this.usersService.generateOTP();
    }

    @Post('/forgot-password')
    async forgotPassword(@Body() updatePassworddto: UpdatePasswordDto) {
        return this.usersService.forgotPassword(updatePassworddto);
    }


    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        console.log(resetPasswordDto);
        return await this.usersService.resetPassword(resetPasswordDto);
    }


    @Delete('/delete/:id')
    async deleteUserById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("ObjectId is not valid", 505);
        const deleteUser = await this.usersService.deleteUser(id);
        console.log(deleteUser);
        return { message: "user deleted succeffully", user: deleteUser };
    }

    @Post('delete-multiple')
    async deleteMultipleUsers(@Body() ids: any, @Res() res: Response) {
        const deleteduser = await this.usersService.deleteUsers(ids);
        return res.status(200).json({ message: `user deleted successfully` });
    }


    // update user
    @Put('/update/:id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("ObjectId is not valid", 400);
        let updatedUser = await this.usersService.updateUser(id, updateUserDto)
        // if(updatedUser) throw new HttpException("User not found",400);
        return res.status(200).json({ message: "User Updated Successfully.", user: updatedUser })
    }


    @Post('/toggleUserStatus/:userId')
    async toggleUserStatus(@Param('userId') userId: any) {
        const user = await this.usersService.toggleStatus(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const res = user.status ? 'User is active' : 'User is inactive';
        return { user: user, message: res };
    }

    @Get('/allUsersCount')
    async getAllUsersCount(@Res() res:Response){
        let cnt = await this.usersService.getUsersCount();
        return res.status(200).json({User_Count :cnt});
    }

    @Get('/adminUsersCount')
    async getAdminUsersCount(@Res() res:Response){
        let cnt = await this.usersService.getAdminUserCnt();
        return res.status(200).json({Admin_User_Count :cnt});
    }

    @Get('/userRoleUsersCount')
    async getUSERroleUsersCount(@Res() res:Response){
        let cnt = await this.usersService.getUserRoleCnt();
        return res.status(200).json({UserRole_User_Count :cnt});
    }


    @Get('/activeUsersCount')
    async getActiveUserCount(@Res() res:Response){
        let cnt = await this.usersService.getActiveUsersCnt();
        return res.status(200).json({Active_User_Count :cnt});
    }

}
