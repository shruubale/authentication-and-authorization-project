import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { CreateBannerDto } from "./dto/createBanner.dto";
import { BannerService } from "./banner.service";
import { Response, query } from 'express';
import mongoose from "mongoose";
import { UpdateBannerDto } from "./dto/updateBanner.dto";

@Controller('banner')
export class BannerController {
    constructor(private bannerService : BannerService){}

    @Post('/createBanner')
    @UseInterceptors(FileInterceptor('img', {
        storage: diskStorage({
            destination: './uploads/banners',
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
    async createBanner(@UploadedFile() file: Express.Multer.File, @Body() createBannerDto: CreateBannerDto, ): Promise<any> {
        return this.bannerService.createBanner(createBannerDto, file);
        // let dataa = this.bannerService.createBanner(createBannerDto,file);
        // return res.status(200).json({ message: "Banner Created", dataa })
    }

    @Delete('/deleteBanner/:id')
    async deleteBanner(@Param('id') id: string)
    {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("ObjectId is not valid", 505);
        const deleteUser = await this.bannerService.deleteBanner(id);
        return {message:"Banner Deleted..."}
    }


    @Put('/updateBanner/:id')
    @UsePipes(new ValidationPipe())
    async updateBanner(@Param('id') id: string , @Body() updateBannerDto:UpdateBannerDto , @Res() res:Response){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("ObjectId is not valid", 400);
        let updatedBanner = await this.bannerService.updateBaner(id, updateBannerDto);
        return res.status(200).json({ message: "Banner Updated Successfully.", user: updatedBanner })
    }


    @Get('/allBanners')
    async getAllBanners(@Query() query)
    {
        return this.bannerService.getAllBaners(query);
    }


    @Put('/updateWithFile/:id')
    @UseInterceptors(FileInterceptor('img')) // 'image' here should match the name of the field in the FormData
    async updateImgBanner(
      @Param('id') id: string,
      @Body() updateBannerDto: UpdateBannerDto,
      @UploadedFile() file,
    ) {
      const banner = await this.bannerService.updateBanner(id, updateBannerDto, file);
      if (!banner) {
        throw new NotFoundException('Banner not found');
      }
      return {banner:banner , message:"Banner Updated Successfully"};
    }


    @Post('delete-multiple-banners')
    async deleteMultipleBanners(@Body() ids: any, @Res() res: Response) {
        const deletedbanners = await this.bannerService.deleteBaners(ids);
        return res.status(200).json({ message: `Banners deleted successfully` });
    }


    @Get('/banner/:id')
    async getBannerDetail(@Param('id') id:string , @Res() res:Response)
    {
       let banner= await this.bannerService.getBannerDetail(id);
       return res.status(200).json({message: "Banner detail fetched successfully" , banner:banner})
    }

    @Get('/bannerCount')
    async bannerCnt(@Res() res:Response)
    {
        let bannercnt = await this.bannerService.getAllBannersCount()
        return res.status(200).json({bannercnt:bannercnt })
    }
}