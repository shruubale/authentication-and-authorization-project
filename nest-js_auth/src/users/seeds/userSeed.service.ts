import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserRole } from "../users.model";
import mongoose from "mongoose";
import { SignupUserDto } from "../dto/signupUser.dto";


@Injectable()
export class UsersSeederService {
    constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>) { }

    async create(){
        console.log("Admin data seeding start..........!!!!!!!!!!!");
        
        const user =await this.userModel.find({email:"admin1@gmail.com"});
        console.log(user);
        
        if(!(user?.length>0))
            {
                const data:SignupUserDto = {
                    firstName: "Admin",
                    lastName: "Admin",
                    email: "admin1@gmail.com",
                    password: "$2y$10$q.RXWKM21x3PNE24Scu0HeR2HuSXr54P.3nNdeBjkKfZ6eqKC4ylm",
                    // dob:"Thurs May 10 2001 00:00:00 GMT+0530 (India Standard Time)",
                    address: "test",
                    zipCode: 456987,
        
                    role: UserRole.ADMIN,
                    status: true,
                    // dob: undefined
                }
                // const hashPassword = await bcrypt.hash(data.password, 10);
                // data.dob = new Date(data.dob);
                const newUser = await new this.userModel({
                    ...data,
                });
                console.log(newUser);
                console.log("Admin data seeding done..........!!!!!!!!!!!");
                return await newUser.save();
                
            }

            else{
                console.log("Admin already exists!!!!");
                
            }

       
    }
}