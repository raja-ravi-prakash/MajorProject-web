import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityType, IEntity } from '../common/models/common';
import { EntitySerice } from '../common/services/entity.service';
import { EntityCreationComponent } from './entity-creation/entity-creation.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entity-management',
  templateUrl: './entity-management.component.html',
  styleUrls: ['./entity-management.component.scss']
})
export class EntityManagementComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private entityService: EntitySerice,
    private toastService: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let rootEntity: IEntity = JSON.parse(sessionStorage.getItem('rootEntity') as string);
    this.path = [rootEntity];
    this.getAllEntities();
  }

  public path: IEntity[] = [];
  public entities: IEntity[] = [];
  public entypes = EntityType;
  public filter:string = "MINE";
  private getCurrentRoot(){
    return this.path.slice(-1)[0];
  }

  public pathChange(entity: IEntity){
    if(entity.type == EntityType.FILE){
      let w = window.open('about:blank') as Window;
      let image = new Image();
      image.src = entity.file;
      w.document.write(image.outerHTML);
    }
    else if(entity.type == EntityType.FOLDER){
      this.path.push(entity);
      this.getAllEntities();
    }
  }

  public routePop(){
    if(this.path.length == 1)
      return this.router.navigate(['/home']);
    
    this.path.pop();
    return this.getAllEntities();
  }

  public jumpToPath(index: number){
    this.path = this.path.slice(0, index+1);
    this.getAllEntities();
  }

  public openEntityManagementDialog(){
    let dialogRes = this.dialog.open(EntityCreationComponent);
    dialogRes.afterClosed().subscribe(res=>{
      if(res.type == "folder")
        this.entityService.createFolder(res.name,res.userGroups, this.getCurrentRoot()._id).subscribe(res=>{
          if(res.success)
            this.toastService.success(res.message);
          else 
            this.toastService.error(res.message);
          this.getAllEntities();
        });
      else if(res.type == "file")
        this.entityService.createFile(res.file, res.fileName,res.userGroups, this.getCurrentRoot()._id).subscribe(res=>{
          if(res.success)
            this.toastService.success(res.message);
          else 
            this.toastService.error(res.message);
          this.getAllEntities();
        });
    });
  }

  public getAllEntities(){
    if(this.filter =="MINE")
    {
      this.entityService.getAllEntities(this.getCurrentRoot()._id).subscribe(result=>{
        if(result.success){
          this.entities = result.data;
        }
        else 
          this.toastService.error(result.message);
      });
    }
    else
    {
      this.entityService.getMyEntities(this.getCurrentRoot()._id).subscribe(result=>{
        if(result.success){
          this.entities = result.data;
        }
        else 
          this.toastService.error(result.message);
      });
    }
  }

  public deleteEntity(id: string){
    this.entityService.deleteEntity(id).subscribe(res=>{
      if(res.success)
        this.toastService.success(res.message);
      else 
        this.toastService.error(res.message);
      this.getAllEntities();
    })
  }

  public onChangeSelect(event:any){
    this.getAllEntities();
  }

}
