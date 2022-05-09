import { Component, OnInit } from '@angular/core';
import { EntitySerice } from 'src/app/common/services/entity.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-entity-creation',
  templateUrl: './entity-creation.component.html',
  styleUrls: ['./entity-creation.component.scss']
})
export class EntityCreationComponent implements OnInit {

  public entityState: string = "folder"; 
  public folderCreationName: string = "";
  public file: string = "";
  public fileName: string = "";

  constructor(private entityService: EntitySerice, private dialogRef: MatDialogRef<EntityCreationComponent>) { }

  ngOnInit(): void {}

  public handleFileInput(event: any){
    let file = event.target.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(file);
    this.fileName = file.name;
    fr.onload = (e: any)=>{
      this.file = e.target.result;
    }
  }

  public create(){
    if(this.entityState == "folder")
      this.dialogRef.close({
        type: 'folder',
        name: this.folderCreationName
      });
    else if(this.entityState == "file")
      this.dialogRef.close({
        type: 'file',
        file: this.file,
        fileName: this.fileName
      })
  }

}
