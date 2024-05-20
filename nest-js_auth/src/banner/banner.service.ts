import { Injectable, NotFoundException } from '@nestjs/common';
import { Banner } from './banner.model';
// import mongoose, { Query } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBannerDto } from './dto/createBanner.dto';
import { UpdateBannerDto } from './dto/updateBanner.dto';
import { Query } from 'express-serve-static-core'
import mongoose, { Condition } from 'mongoose';
import { log } from 'console';

@Injectable()
export class BannerService {

  constructor(@InjectModel(Banner.name) private bannerModel: mongoose.Model<Banner>,) { }


  async createBanner(data: CreateBannerDto, banner: any): Promise<Banner> {
    const newBanner = await new this.bannerModel({
      ...data,
      img: banner.filename
    });
    console.log(newBanner);
    return await newBanner.save();
  }

  async deleteBanner(id: any) {
    const _id = await this.bannerModel.findByIdAndDelete(id);
    return _id;
  }

  // update banner without file
  async updateBaner(id: string, updateBannerDto: UpdateBannerDto,) {
    const banner = await this.bannerModel.findByIdAndUpdate(id, updateBannerDto, { new: true });
    console.log(banner);
    return banner;
  }


  // update with file 
  async updateBanner(id: string, updateBannerDto: UpdateBannerDto, file): Promise<Banner> {
    const banner = await this.bannerModel.findById(id).exec();

    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    // Update fields
    if (updateBannerDto.title) {
      banner.title = updateBannerDto.title;
    }
    if (updateBannerDto.description) {
      banner.description = updateBannerDto.description;
    }

    if (updateBannerDto.startDate) {
      banner.startDate = updateBannerDto.startDate;
    }

    if (updateBannerDto.endDate) {
      banner.endDate = updateBannerDto.endDate;
    }

    if (file) {
      banner.img = file.filename;
    }

    await banner.save();
    return banner;
  }



  async getAllBaners(query: Query) {
    let resPerPage: number;
    const currentPage = Number(query.page) || 1
    const limit = 1;
    const keyword: { title?: Condition<string> } = query.keyword ? {
      title: {
        $regex: new RegExp(Array.isArray(query.keyword) ? query.keyword.join("|") : query.keyword as string, 'i'),
      }
    } : {};
    const banners = await this.bannerModel.find({ ...keyword }).limit(resPerPage)
    return banners;
  }


  async deleteBaners(ids: any) {
    console.log(ids);
    console.log('IDs received:', ids);
    if (!Array.isArray(ids)) {
      throw new Error('ids must be an array');
    }
    return this.bannerModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async getBannerDetail(id: string) {
    let banner = this.bannerModel.findById(id)
    console.log(banner);
    return banner;
  }

  async getAllBannersCount()
  {
    let bannerCount = (await this.bannerModel.find()).length
    console.log(bannerCount);
    return bannerCount;
    
  }

}