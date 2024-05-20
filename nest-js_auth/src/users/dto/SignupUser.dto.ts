export class SignupUserDto { 
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    dob?:Date;
    address:string;
    zipCode:number;
    file?:any;
    role;
    status;
}
