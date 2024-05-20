import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

export interface Users {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  address: string;
  zipCode: number;
  file: string;
  role: string;
  status: boolean;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  arrResponse: any = [];
  pageNO: number = 1;
  pageSize: number = 5;
  sortOrder = 'asc'
  search: string = '';
  filterValue
  statusBtn = 'status'
  updateBtn = '';

  displayedColumns: string[] = ['select','assigned', 'email', 'dob', 'address', 'actions', 'status'];

  dataSource: any;
  ELEMENT_DATA: Users[] = [];
  constructor(private cdr: ChangeDetectorRef,private route :Router, private service: MainService, private fb: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog) { }
  ngOnInit() {
    this.getAllUsers();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.paginator.firstPage()
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  getAllUsers() {
    this.service.getAllUsers(this.search, this.pageSize).subscribe((res) => {
      this.ELEMENT_DATA = [];
      this.arrResponse = res
      this.ELEMENT_DATA = this.ELEMENT_DATA.concat(this.arrResponse);
      this.dataSource = new MatTableDataSource<Users>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.ELEMENT_DATA);
    })
  }

  selection = new SelectionModel<any>(true, []);
  numSelected


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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.paginator.pageSize;
    return numSelected === numRows;
  }

  bulkDelete() {
    const selectedRows = this.selection.selected;
    const selectedIds = selectedRows.map(user => user._id);
    const selectedUsers = [];
    selectedIds.forEach(row => {
      selectedUsers.push(row);
    });

    this.service.deleteUsers(selectedIds).subscribe((res) => {
      console.log(res);
      this.openSnackBar("users deleted successfully");

      this.getAllUsers();
    });
  }


  deleteUser(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this user?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteUser(id)
          .subscribe(
            () => {
              this.openSnackBar("user deleted successfully");
              this.getAllUsers();
            },
            (error: any) => {
              console.error('Error deleting user', error);
            }
          );
      }
    });
  }



  toggleStatus(id) {
    this.service.toggleStatus(id).subscribe((res) => {
      if (res.user.status == true) {
        res.user.status = false
        this.getAllUsers();
      } else {
        res.user.status = true
        this.getAllUsers();
      }
    })
  }

  addUser() {
    this.route.navigate(['/admin/admin-ui-components/add-users'])
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', { 
      duration: 2000,
      panelClass: ['snackbar-style']
    });
  }
  

  openDialog(data: any) {
    const dialog = this.dialog.open(EditUsersComponent, {
      maxWidth: '800px',
      width: '400px',
      height: '600px',
      data: {
        Details: data
      }
    });
    dialog.afterClosed().subscribe(result => {
      this.getAllUsers();
    })
  }

}


