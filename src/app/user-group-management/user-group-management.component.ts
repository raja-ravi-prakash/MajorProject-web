import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserGroupPreviewComponent } from './user-group-preview/user-group-preview.component';
import { UserGroupService} from '../../app/common/services/userGroup.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-group-management',
  templateUrl: './user-group-management.component.html',
  styleUrls: ['./user-group-management.component.scss']
})
export class UserGroupManagementComponent implements OnInit {

  userGroupList:any[]=[]
  constructor(private dialog:MatDialog, private userGroupService:UserGroupService, private toastService:ToastrService) { }

  ngOnInit(): void {
   this.getUserGroups();
  }

  getUserGroups()
  {
    this.userGroupService.getAllUserGroups().subscribe(res=>{
      console.log(this.userGroupList)
      this.userGroupList = res.data
    })
  }
  openDialog(id?:string): void {

    console.log(id)
    const dialogRef = this.dialog.open(UserGroupPreviewComponent, {
      width: '500px',
      data:{id:id?id:null},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getUserGroups();
    });
  }

  deleteUserGroup(id:string)
  {
    this.userGroupService.deleteUserGroup(id).subscribe(res=>{

      if(res.success)
      {
        this.toastService.success(res.message);
        this.getUserGroups();
      }
      else 
      {
        this.toastService.error(res.message);
        this.getUserGroups();
      }

    })
  }
}
