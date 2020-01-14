import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent {
  Isloading:boolean=true;
  constructor(){
  
  }
  ngOnInit() {
    setTimeout(()=>{
      this.Isloading=false;
 }, 2000);    
  }
 }
