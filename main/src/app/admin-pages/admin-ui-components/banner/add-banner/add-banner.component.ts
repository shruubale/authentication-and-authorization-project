import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent {
  AddBannerForm: FormGroup;
  selectedFile: File;

  constructor(private fb :FormBuilder,private route:Router, private service:BannerService, private snackBar: MatSnackBar){}
  ngOnInit() {
    this.AddBannerForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      img:['',Validators.required]
    })
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  getData()
  {
    const formData = {
      title:this.AddBannerForm.controls.title.value,
      description:this.AddBannerForm.controls.description.value,
      startDate:this.AddBannerForm.controls.startDate.value,
      endDate:this.AddBannerForm.controls.endDate.value
    }
    return formData;
  }

  addBanner()
  {
    const formData = new FormData();
    formData.append('img',this.selectedFile);

    const bannerData = this.getData();
    Object.keys(bannerData).forEach(key => {
      formData.append(key,bannerData[key]);
    });

    if(formData)
      {
        this.service.createBanner(formData).subscribe((res)=>{
          console.log(res);
          this.openSnackBar("Banner Added !!!");
          console.log(formData);
          this.route.navigate(['/admin/admin-ui-components/banner']);
        })
      }
      else {
            this.openSnackBar("Something Went Wrong")
           }
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000, });
  }
}
