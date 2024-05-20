export class SignInResponse {
    message: string;
    dataa: {
        token: string;
        user: {
            firstName: string;
            lastName: string;
            email: string;
            dob: Date;
            address: string;
            zipCode: number;
            role:string;
        }
    }
}


export class GetAllUsersResponse{
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    dob:string;
    address:string;
    zipCode:number;
    file:string;
    role:string;
    status:boolean;

}


export class SignUpResponse {
    message: string;
    User: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        dob: string
        role:string;
    }
}

export class ForgotPasswordResponse{
    code:Number;
    message:string;
    user:{
        firstName:string;
        lastName:string;
        email:string;
        dob:Date;
        address:string;
        zipCode:number;
        file:string;
        otp:number;
        role:string;
    }
}

export class ResetPasswordResponse{
    user:{
        firstName:string;
        lastName:string;
        email:string;
        dob:Date;
        address:string;
        zipCode:number;
        file:string;
        otp:number;
        role:string;
    }
    message:string;
}

export class DeleteUserResponse{
    message:string;
    user:{
        firstName:string;
        lastName:string;
        email:string;
        dob:Date;
        address:string;
        zipCode:number;
        file:string;
        otp:number;
        role:string;
    }

}

export class DeleteUsersResponse{
    message:string;
}

export class UpdateUserResponse{
    message:string;
    user:{
        firstName:string;
        lastName:string;
        email:string;
        dob:Date;
        address:string;
        zipCode:number;
        file:string;
        otp:number;
        role:string;
    }
}

export class ToggleStatusResponse{
    message:string;
    user:{
        firstName:string;
        lastName:string;
        email:string;
        dob:Date;
        address:string;
        zipCode:number;
        file:string;
        otp:number;
        role:string;
        status:boolean;
    }
}

export class AllUsersCount{
    User_Count:number;
}

export class AdminRoleUserCount{
    Admin_User_Count:number;
}

export class UserRoleUserCount{
    UserRole_User_Count : number;
}

export class ActiveUserCount{
    Active_User_Count:number;
}

