import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntityType, IEntity, IPrimaryEntity } from 'src/app/common/models/common';
import { PrimaryEntitySerice } from 'src/app/common/services/primaryEntity.service';

@Component({
  selector: 'app-face-filtering',
  templateUrl: './face-filtering.component.html',
  styleUrls: ['./face-filtering.component.scss']
})
export class FaceFilteringComponent implements OnInit {

  constructor(private router: Router, private primaryEntityService: PrimaryEntitySerice, private toastService: ToastrService) { }
  public primaryEntities: IPrimaryEntity[] = [];
  public entities: IEntity[] = [];
  public entypes = EntityType;

  ngOnInit(): void {
    this.getPrimaryEntities();
  }

  private getPrimaryEntities(){
    this.primaryEntityService.getAllEntities().subscribe(res=>{
      if(res.success){
        this.primaryEntities = res.data;
        this.toastService.success(res.message);
      }
      else 
        this.toastService.error(res.message);
    })
  }

  public pathChange(entity: IEntity){
    if(entity.type == EntityType.FILE){
      let w = window.open('about:blank') as Window;
      let image = new Image();
      image.src = entity.file;
      w.document.write(image.outerHTML);
    }
  }

  public routePop(){
    return this.router.navigate(['/home']);
  }

  public selectPrimaryEntity(id: string){
    this.primaryEntityService.getEntitiesByPrimaryEntity(id).subscribe(res=>{
      if(res.success){
        this.entities = res.data;
        this.toastService.success(res.message);
      }
      else 
        this.toastService.error(res.message);
    });
  }

}
