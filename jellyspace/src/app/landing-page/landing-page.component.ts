import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  _openCommunityTab() {
    window.open('http://18.144.156.141:4200/community', '_blank');
  }
}
