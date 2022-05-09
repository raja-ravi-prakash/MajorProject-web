import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-module-choose',
  templateUrl: './main-module-choose.component.html',
  styleUrls: ['./main-module-choose.component.scss']
})
export class MainModuleChooseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}

}
