import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { S3 } from 'aws-sdk';
import { AppService } from '../app.service';

@Component({
  selector: 'app-account-handler-details',
  templateUrl: './account-handler-details.component.html',
  styleUrls: ['./account-handler-details.component.css']
})
export class AccountHandlerDetailsComponent implements OnInit {


  selectedFiles!: FileList;
  imagePath: any;
  fileData:any;
  url:any;
  images = [];
  imgShow:boolean=true;


  constructor(
    private service:AppService,
    private router: Router
  ) { }
  public fieldTextType: boolean = false;
  managerList: any = [];
  bidFlag: boolean = false;
  collabratorFlag:boolean = false;

  public fName:any;
  public lName:any;
  public eMail:any;
  public mobileNo:any;
  public title:any;
  public pWord:any;
  public file:any;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnInit(): void {
    this.fName = localStorage.getItem('otherFName');
    this.lName = localStorage.getItem('otherLName');
    this.eMail = localStorage.getItem('othereMail');
    this.mobileNo = localStorage.getItem('otherMobileNo');
    this.title = localStorage.getItem('otherTitle');
    this.pWord = localStorage.getItem('otherPWord');
    this.file = localStorage.getItem('imagepath');
    this.managerList = [
      {label:'Yes' , value:'0'},
      {label:'No' , value:'1'},
    ]
  }

  selectBidManager(item:any) {
    if(item === 'Yes') {
      this.collabratorFlag = true;
    } else {
      this.collabratorFlag = false;
    }
  }

  onChangeCollabrator(eve:any) {
    console.log(eve.target.checked)
    if(eve.target.checked) {
      this.bidFlag = true;
    } else {
      this.bidFlag = false;
    }
  }
  selectImage(event:any){
    console.log("image upload")
    this.imgShow = false;
    const files = event.target.files;
    if (files.length === 0)
        return;
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
        this.url = reader.result;
    }
    this.fileData= event.target.files[0];

  }

  nextClick() {
    const contentType = this.fileData.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIA2DXB2VTKA7BN2YXP',
              secretAccessKey: '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',
              region: 'us-east-1'
          }
      );
      const file = this.fileData;
      const companyMailId = this.eMail;
      const folderName = 'Companies';
      const fileName = file.name;
      localStorage.setItem('nameOTP', this.fName +' ' + this.lName);
      const params = {
        email: this.eMail,
        name: this.fName + ' ' + this.lName,

        Bucket: 'jellyspace-public',
          Key:  `company/${companyMailId}/${folderName}/${fileName}`,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      localStorage.setItem('otherFName', this.fName);
      localStorage.setItem('otherLName', this.lName);
      localStorage.setItem('othereMail', this.eMail);
      localStorage.setItem('registerEmail', this.eMail);
      localStorage.setItem('otherPWord', this.pWord);
      localStorage.setItem('otherTitle', this.title);
      localStorage.setItem('otherMobileNo', this.mobileNo);
      bucket.upload(params, function (err:any,  data:any) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          localStorage.setItem('otherImage', data.Location);
          console.log('Successfully uploaded file.', data);
          return true;
      });

    // const params ={

    // }
    this.service.sendOTP(params).subscribe((data: any) => {
      if(data.status === true) {
        this.router.navigate(['email-verification']);
      } else {
        alert(data.message);
      }
    })
  }

}
