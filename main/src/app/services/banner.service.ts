import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteBannerResponse, DeleteMultipleBannersResponse, GetBannersResponse, UpdateBannerResponse } from '../model/BannerResponse';



@Injectable({
    providedIn: 'root'
})
export class BannerService {
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) { }

    getBanners() {
        let API = `/banner/allBanners`;
        return this.http.get<GetBannersResponse>(API);
    }

    createBanner(formDate:any)
    {
        let API = `/banner/createBanner`;
        return this.http.post(API , formDate);
    }

    // update banner without file
    updateBaner(id:any,formData:any)
    {
        let API = `/banner/updateBanner/${id}`;
        return this.http.put<UpdateBannerResponse>(API,formData);
    }

    // api update banner with file 
    updateBanner(id:any,formData:any)
    {
        let API = `/banner/updateWithFile/${id}`;
        return this.http.put<UpdateBannerResponse>(API,formData);
    }

    // delete multiple banners 
    deleteBanners(ids:any){
        const id = ids;
        let API=`/banner/delete-multiple-banners`;
        return this.http.post<DeleteMultipleBannersResponse>(API,ids)
      }

    // delete single banner
    deleteBanner(id:any)
    {
        let API=`/banner/deleteBanner/${id}`;
        return this.http.delete<DeleteBannerResponse>(API , id);

    }
}