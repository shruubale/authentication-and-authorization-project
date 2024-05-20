export class GetBannersResponse {
    [x: string]: any;
    _id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    img: string;
}

export class CreateBannerResponse {
    _id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    img: string;
}

export class UpdateBannerResponse {
    message: string;
    banner: {
        _id: string;
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
        img: string;
    }
}

export class DeleteBannerResponse {
    message:string;
}

export class DeleteMultipleBannersResponse{
    message:string;
}