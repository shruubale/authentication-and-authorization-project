import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss']
})
export class EditBannerComponent {
  EditBannerForm: FormGroup;
  selectedFile: File;
  Details: any;
  constructor(private fb :FormBuilder,private route:Router, private service:BannerService, private snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<EditBannerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any  
  ){}
  ngOnInit() {
    this.Details =this.data.Details;
    console.log(this.data.Details);
    this.EditBannerForm = this.fb.group({
      title:[this.data.title],
      description:[this.data.description],
      startDate:[this.data.startDate],
      endDate:[this.data.endDate],
    
    });
    this.setFormValues();
  }

  setFormValues(){
    this.EditBannerForm.controls.title.setValue(this.Details.title);
    this.EditBannerForm.controls.description.setValue(this.Details.description);
    this.EditBannerForm.controls.startDate.setValue(this.Details.startDate);
    this.EditBannerForm.controls.endDate.setValue(this.Details.endDate);
  }
  
   

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  getData()
  {
    const formData = {
      title:this.EditBannerForm.controls.title.value,
      description:this.EditBannerForm.controls.description.value,
      startDate:this.EditBannerForm.controls.startDate.value,
      endDate:this.EditBannerForm.controls.endDate.value,

    }
    return formData;
  }


  updateBanner()
  {
    if(this.EditBannerForm.valid)
      {
        const formData = new FormData();
      formData.append('title', this.EditBannerForm.get('title').value);
      formData.append('description', this.EditBannerForm.get('description').value);
      formData.append('startDate', this.EditBannerForm.get('startDate').value);
      formData.append('endDate', this.EditBannerForm.get('endDate').value);
      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
      this.service.updateBanner(this.Details._id,formData).subscribe((res)=>{
        console.log(res);
          this.openSnackBar(res.message);
          this.closeDialog()
          this.route.navigate(['/admin/banner']);
      },(error)=>{
        console.error(error);
        this.openSnackBar('Error occurred while updating banner');
        this.closeDialog()
      })
      }
      else{
        this.openSnackBar('Please fill all the required fields');
        this.closeDialog()
      }
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000, });
  }


  closeDialog(){
    this.dialogRef.close();
  }

}
