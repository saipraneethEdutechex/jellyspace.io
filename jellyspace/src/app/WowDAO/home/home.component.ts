import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../app.service';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('mychart') mychart: ElementRef<HTMLCanvasElement> | undefined;
  chatbox: boolean = false;
  public showSearch = false;
  sideNavBar: boolean = false;
  inputFlag: boolean = false;
  closeResult: string = '';
  sideButton: boolean = true;
  primarySkillSet: any = [];
  selectItemsList: any = [];
  currentBidProjectDetailsList: any = [];
  accepttBidProjectDetailsList: any = [];
  modalBudget: any;
  skillId: any;
  searchFlag: boolean = false;
  modalProjectId: any;
  modalProjectEmail: any;
  modalHeaderName: any;
  modalDescription: any;
  postingFlag: boolean = true;
  rupeesList: any = [];
  amountList: any = [];
  amountList1: any = [];
  projectFlag: boolean = false;
  payComboFlag: boolean = false;
  fixedComboFlag: boolean = false;
  usdList: any = [];
  usdFlag: boolean = false;
  nzdFlag: boolean = false;
  audFlag: boolean = false;
  gbpFlag: boolean = false;
  hkdFlag: boolean = false;
  sgdFlag: boolean = false;
  eurFlag: boolean = false;
  cadFlag: boolean = false;
  indFlag: boolean = false;
  nzdList: any = [];
  audList: any = [];
  gbpList: any = [];
  hkdList: any = [];
  sgdList: any = [];
  eurList: any = [];
  cadList: any = [];
  projectName: any;
  writeBidDescription: any;
  projectDescription: any;
  usdAmountDisplay: any;
  standardFlag: boolean = false;
  ndaFlag: boolean = false;
  ipFlag: boolean = false;
  featuredFlag: boolean = false;
  urgentFlag: boolean = false;
  skillFlag: boolean = false;
  privateFlag: boolean = false;
  sealedFlag: boolean = false;
  fulltimeFlag: boolean = false;
  findAmount: any;
  nextButton: boolean = true;
  nextButton1: boolean = false;
  nextButton2: boolean = false;
  forwardFlag: boolean = false;
  forwardFlag1: boolean = false;
  writeBidBtnFlag: boolean = true;
  payHourType: any;
  usdFixedList: any = [];
  nzdFixedList: any = [];
  audFixedList: any = [];
  gbpFixedList: any = [];
  hkdFixedList: any = [];
  sgdFixedList: any = [];
  eurFixedList: any = [];
  cadFixedList: any = [];
  findRupeesList: any = [];
  findRupeesId: any;
  payType: any;
  usdFixedFlag: boolean = false;
  nzdFixedFlag: boolean = false;
  audFixedFlag: boolean = false;
  gbpFixedFlag: boolean = false;
  hkdFixedFlag: boolean = false;
  sgdFixedFlag: boolean = false;
  eurFixedFlag: boolean = false;
  cadFixedFlag: boolean = false;
  indFixedFlag: boolean = false;
  writeBidFlag: boolean = false;
  modalSkills: any = [];
  standardCheck: boolean = false;
  ndaCheck: boolean = false;
  ipCheck: boolean = false;
  featureCheck: boolean = false;
  urgentCheck: boolean = false;
  privateCheck: boolean = false;
  sealedeCheck: boolean = false;
  fulltimeCheck: boolean = false;
  minimumFlag: boolean = false;
  maximumFlag: boolean = false;
  postingList: any = [];
  selectedIndex: any;
  projectDataList: any = [];
  projectDataListByEmail: any = [];
  rupeesId: any;
  minimumAmount: any;
  maxAmount: any;
  suggestSkillId: any;
  minAmount: any = 0;
  maxAmountVal: any = 0;
  payHoursList: any = [];
  findSkillId: any;
  searchIcon: boolean = true;
  bidProjectDetailsList: any = [];
  findProjectDeatilsFlag: boolean = false;
  accountType: any;
  email: any;
  fname: any;
  lname: any;
  image: any;
  skillList: any = [];
  primarySkillSet1: any = [];
  loginEmail: any;

  public fundingArray = ['Description of Funding'];

  canvas: any;
  ctx: any;

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private service: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    // Register Chart.js components
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale
    );
  }

  ngOnInit(): void {
    this.loginEmail = localStorage.getItem('userEmail');
    this.getProjectsByEmail();
    this.getProjectsData();
    this.getBidDetails();
    this.getCurrentBidDetails();
    this.loginUserDetails();
    this.findRupeesId = this.findRupeesList[0]?.label;
  }

  ngAfterViewInit(): void {
    this.canvas = this.mychart?.nativeElement;
    this.ctx = this.canvas?.getContext('2d');
    if (this.ctx) {
      new Chart(this.ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Current Value',
              data: [0, 20, 30, 40],
              backgroundColor: 'orange',
              borderColor: 'red',
              fill: true,
            },
            {
              label: 'Current Value',
              data: [0, 20, 30, 40, 50, 70],
              backgroundColor: 'orange',
              borderColor: 'red',
              fill: true,
            },
          ],
          labels: ['January 2019', 'February 2019', 'March', 'April'],
        },
      });
    }
  }

  openForm() {
    this.chatbox = true;
  }

  closeForm() {
    this.chatbox = false;
  }

  menuIcon() {
    this.sideNavBar = true;
    this.sideButton = !this.sideButton;
  }

  openSearch() {
    this.inputFlag = !this.inputFlag;
  }

  getProjectsByEmail() {
    const params = {
      email: localStorage.getItem('userEmail'),
    };
    this.service.getProjectByEmail(params).subscribe((res: any) => {
      this.projectDataListByEmail = res['data'];
    });
  }

  getProjectsData() {
    this.service.getApiDataBinding().subscribe((res: any) => {
      console.log(res);
      this.projectDataList = res['data'];
    });
  }

  writeBid() {
    this.writeBidFlag = true;
    this.writeBidBtnFlag = false;
  }

  closeBid() {
    this.writeBidFlag = false;
    this.writeBidBtnFlag = true;
  }

  clearBid() {
    this.findRupeesId = this.findRupeesList[0]?.label;
    this.writeBidDescription = '';
    this.minAmount = 0;
    this.maxAmountVal = 0;
    this.featuredFlag = false;
    this.urgentFlag = false;
    this.standardFlag = false;
    this.privateFlag = false;
    this.sealedFlag = false;
    this.fulltimeFlag = false;
  }

  getBidDetails() {
    const params = {
      projectEmail: localStorage.getItem('userEmail'),
    };
    this.service.getBidInitDetails(params).subscribe((res: any) => {
      this.bidProjectDetailsList = res.data;
      console.log(res);
    });
  }

  getCurrentBidDetails() {
    const params = {
      userEmail: localStorage.getItem('userEmail'),
    };
    this.service.getCurrentBidDetailsList(params).subscribe((res: any) => {
      const list = res.data;
      this.currentBidProjectDetailsList = list.filter(
        (obj: any) => obj.status === 'pending'
      );
      this.accepttBidProjectDetailsList = list.filter(
        (obj: any) => obj.status === 'accepted'
      );
      console.log(res);
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === 'by pressing ESC') {
      return 'by pressing ESC';
    } else if (reason === 'by clicking on a backdrop') {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  viewProfileSCM() {
    let params = {};
    this.router.navigate(['scm-profile']);
  }
  viewProfile1() {
    let params = {};
    this.router.navigate(['company-profile'], {
      queryParams: params,
      skipLocationChange: false,
    });
  }
  setDefault() {
    this.image = '/assets/img/avatar.png';
  }

  loginUserDetails() {
    const params = {
      email: this.loginEmail || '',
    };
    this.service.loginUserDetails(params).subscribe((data: any) => {
      console.log(data);
      if (data.status === true) {
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userId', data.data._id);
        this.accountType = data.data.accountType;
        this.email = data.data.email;
        this.fname = data.data.firstName;
        this.lname = data.data.lastName;
        this.skillList = data.data.skills;
        this.image = data.data.image;
      } else {
        alert(data.message);
      }
    });
  }
}
