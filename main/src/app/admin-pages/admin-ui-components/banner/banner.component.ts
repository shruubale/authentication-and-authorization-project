import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';
import { MainService } from 'src/app/services/main.service';
import { EditBannerComponent } from './edit-banner/edit-banner.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

export interface Banner{
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  img: string;
  actions
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  displayedColumns: string[] = ['select','assigned', 'description', 'dates', 'actions'];
  arrResponse: any = [];
  pageNO:number=1;
  pageSize:number = 5;
  sortOrder='asc'
  search: string = '';
  filterValue 
  statusBtn ='status'
  updateBtn ='';

  dataSource: any;
  ELEMENT_DATA: Banner[] = [];
  constructor(private bannerService: BannerService ,private route:Router, private fb:FormBuilder, private snackBar: MatSnackBar,private dialog : MatDialog) { }

ngOnInit() {
  this.getBanners();
}


selection = new SelectionModel<any>(true, []);
numSelected

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  getBanners()
  {
    this.bannerService.getBanners().subscribe((res)=>{
      this.ELEMENT_DATA =[];
      this.arrResponse =res;
      this.ELEMENT_DATA = this.ELEMENT_DATA.concat(this.arrResponse);
      this.dataSource = new MatTableDataSource<Banner>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      console.log(this.ELEMENT_DATA);
      
    })

  }

  url = `http://localhost:3000/banners/`

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.paginator.firstPage()
    }
  }


  openDialog(data: any) {
    const dialog = this.dialog.open(EditBannerComponent, {
      maxWidth: '800px',
      width: '400px',
      height: '600px',
      data: {
        Details: data
      }
    });
    dialog.afterClosed().subscribe(result => {
      this.getBanners();
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.paginator.pageSize;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = Math.min(startIndex + this.paginator.pageSize, this.paginator.length);
      for (let i = startIndex; i < endIndex; i++) {
        this.selection.select(this.dataSource.data[i]);
      }
    }
    this.numSelected = this.selection.selected.length;
  }


  bulkDelete() {
    const selectedRows = this.selection.selected;
    const selectedIds = selectedRows.map(banner => banner._id);
    console.log(selectedIds);
    
    const selectedBanners = [];
    selectedIds.forEach(row => {
      selectedBanners.push(row);
    });

    this.bannerService.deleteBanners(selectedIds).subscribe((res) => {
      console.log(res);
      this.openSnackBar(res.message);
      this.getBanners();
    });
  }


  // deleteBanner(id:any)
  // {
  //   this.bannerService.deleteBanner(id).subscribe((res)=>{
  //     console.log(res);
  //     this.openSnackBar("Banner Deleted Successfully");
  //     this.getBanners();
      
  //   },(error)=>{
  //     this.openSnackBar("Something went Wrong While deleting the banner")
  //   })
  // }



  deleteBanner(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this banner ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bannerService.deleteBanner(id)
          .subscribe(
            () => {
              this.openSnackBar("Banner Deleted Successfully");
              this.getBanners();
            },
            (error: any) => {
             this.openSnackBar("Something went Wrong While deleting the banner")
            }
          );
      }
    });
  }

  addBanner()
  {
    this.route.navigate(['admin/admin-ui-components/add-banner'])
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000, });
  }



}
