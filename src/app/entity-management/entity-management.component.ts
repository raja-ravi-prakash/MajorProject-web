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

  public async pathChange(entity: IEntity){
    if(entity.type == EntityType.FILE){
      this.openFile(entity.file, entity.name);
    }
    else if(entity.type == EntityType.FOLDER){
      this.path.push(entity);
      this.getAllEntities();
    }
  }

  public openFile(dataUri: string, fileName: string){
    var win = window.open("", "_blank") as Window;
    win.document.write('<iframe name="c15-major-project" src="' + dataUri + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
    win.document.title = 'c15-major-project';
  }

  public downloadEntity(dataUri: string, fileName: string){
    fetch(dataUri)
        .then(res=>res.blob())
        .then(blob=>{
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          document.body.append(link);
          link.click();
          link.remove();
          setTimeout(() => URL.revokeObjectURL(link.href), 7000);
        });
  }

  public printFile(dataUri: string, fileName: string){
    var win = window.open("", "w") as Window;
    var html  = '<html><head><title></title></head>';
    html += '<body style="width: 100%; padding: 0; margin: 0;">';
    html += '<iframe name="c15-major-project" src="' + dataUri + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100vw; height:100vh;" allowfullscreen></iframe>';
    win.document.write(html);
    win.document.write("<script defer>setTimeout(()=>{window.print()}, 1000);</script>")
    win.document.title = fileName;
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
