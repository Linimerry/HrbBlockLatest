import { Component, OnInit } from '@angular/core';
import { ToolService } from './Service/tool.service';
import { Instruction } from './instruction';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  // constructor(private route: ActivatedRoute,private router:Router,private api:ProductService) { 
    
  // }
  ToolInstruction:Instruction;
  errorMessage:  string;;
  constructor(private api:ToolService) {    
  }
  ngOnInit(): void {   
    this. GetInstruction();
     }
     GetInstruction():void{
       this.api.GetInstructions().subscribe( 
        Instruction => {    
          console.log(Instruction);
        this.ToolInstruction =Instruction;            
         },   
         error  => this.errorMessage = <any>error 
         );         
     }

}
