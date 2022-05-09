import { Component, OnInit, Inject } from '@angular/core';
import {COMMA, ENTER, T} from '@angular/cdk/keycodes';
import { UserGroupService } from '../../common/services/userGroup.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-group-preview',
  templateUrl: './user-group-preview.component.html',
  styleUrls: ['./user-group-preview.component.scss']
})
export class UserGroupPreviewComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  permissions = [
    {value: 'READ', viewValue: 'Read'},
    {value: 'DELETE', viewValue: 'Delete'},
  ]

  name:string="";
  userNames:any[] = [];
  selectedPermissions = [];
  userGroupId = this.data.id;
  userGroup :any;
  constructor(private userGroupService:UserGroupService,  public dialogRef: MatDialogRef<UserGroupPreviewComponent>, private toastService:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.userGroupId)
    {
      this.userGroupService.getUserGroup(this.userGroupId).subscribe(res=>{
        const userGroup = res.data;
        this.name = userGroup.name;
        for(let item of userGroup.users)
        {
          this.userNames.push({name: item})
        }
        this.selectedPermissions = userGroup.permissions;
  
      })
    }
  }


  add(event:any): void {
    const value = (event.value || '').trim();

    if (value) {
      this.userNames.push({name: value});
    }
    event.chipInput!.clear();
  }



  remove(user:any): void {
    const index = this.userNames.indexOf(user);

    if (index >= 0) {
      this.userNames.splice(index, 1);
    }
  }

  createPost()
  {
    let userGroup :any ={}
    userGroup.name = this.name;
    userGroup.permissions = this.selectedPermissions;
    userGroup.users = this.userNames.map(user=>user.name);
    if(this.userGroupId)
    userGroup._id = this.userGroupId;
    console.log(this.userGroupId)
    if(this.userGroupId == undefined)
    {
      console.log("in if")
      this.userGroupService.createUserGroup(userGroup).subscribe(res=>{
        if(res.success)
        {
          this.toastService.success(res.message);
          this.dialogRef.close();
        }
        else 
        {
          this.toastService.error(res.message);
        }

      })
    }
    else
    {
      this.userGroupService.updateUserGroup(userGroup).subscribe(res=>{
        if(res.success)
        {
          this.toastService.success(res.message);
          this.dialogRef.close();
        }
        else 
        {
          this.toastService.error(res.message);
        }
      })
    }
  }

}
