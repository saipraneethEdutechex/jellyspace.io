import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user-register',
  templateUrl: './new-user-register.component.html',
  styleUrls: ['./new-user-register.component.css']
})
export class NewUserRegisterComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  onRadioValue: any;
  radiocheck: boolean =false;
  isFreelance:boolean=false;
  isCompany:boolean=false;
  isBigCompany:boolean=false;

  optinos = {opacity:2}

  ngOnInit(): void {
    var b = localStorage.getItem("newuser");
    switch (b) {
      case "freelancer":
        this.isFreelance=true;
        this.radiocheck = true;
        break;
        case "organization":
        this.isBigCompany=true;
        this.radiocheck = true;
          break;
        case "company":
        this.isCompany=true;
        this.radiocheck = true;
          break;

      default:
        break;
    }
  }

  onChnageValue(val:any,eve:any) {
    console.log(eve)
    console.log(eve.target.checked)
    this.radiocheck = eve.target.checked
    this.onRadioValue = val;
    localStorage.setItem('accountType', val);
  }

  JoinJellySpace() {
    if(this.radiocheck === true) {
      if(this.onRadioValue === 'freelancer') {
        this.router.navigate(['user-details']);
        localStorage.setItem("newuser","freelancer");
      } else if(this.onRadioValue === 'organization') {
        this.router.navigate(['company-list']);
        localStorage.setItem("newuser","organization");
      }
      else {
        this.router.navigate(['company-list']);
        localStorage.setItem("newuser", "company")
      }
    } else {


      // alert("Please Select At Least One Option And Continue...")
    }

  }

}
