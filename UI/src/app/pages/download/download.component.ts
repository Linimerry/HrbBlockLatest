import { Component, OnInit } from '@angular/core';
import { DownloadDetails } from './Model/DownloadDetails';
import { DownloadService } from './Service/download.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  pageSize = 10;
  pageNumber = 1;
  downloadDetails:DownloadDetails[];
  errorMessage:  string;;
  constructor(private api:DownloadService) {    
  }

  ngOnInit() {
    this.FetchData();
  }
  FetchData():void{
    this.api.GetDownloadDetails().subscribe( 
      DownloadDetails => {    
       console.log(DownloadDetails);   
     this.downloadDetails =DownloadDetails.filter(x=>x.IsApproved==1);                  
      },   
      error  => this.errorMessage = <any>error 
      );         
  }
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
  DownloadFile(fileName:string):void{

    
    //file type extension
    let checkFileType =  fileName.split('.').pop();
    var fileType;
    if(checkFileType == ".txt")
    {
      fileType = "text/plain";
    }
    if(checkFileType == ".pdf" || checkFileType == "pdf")
    {
      fileType = "application/pdf";
    }
    if(checkFileType == ".doc")
    {
      fileType = "application/vnd.ms-word";
    }
    if(checkFileType == ".docx")
    {
      fileType = "application/vnd.ms-word";
    }
    if(checkFileType == ".xls")
    {
      fileType = "application/vnd.ms-excel";
    }
    if(checkFileType == ".png")
    {
      fileType = "image/png";
    }
    if(checkFileType == ".jpg")
    {
      fileType = "image/jpeg";
    }
    if(checkFileType == ".jpeg")
    {
      fileType = "image/jpeg";
    }
    if(checkFileType == ".gif")
    {
      fileType = "image/gif";
    }
    if(checkFileType == ".csv")
    {
      fileType = "text/csv";
    }
    this.api.DownloadFile(fileName, fileType)
  .subscribe(
            success => {
              var blob = new Blob([success], {type: fileType} )
              saveAs(blob, fileName); 
            },
            err => {
              console.log(err)
                alert("Server error while downloading file.");
            }
        );

          }




          
}
