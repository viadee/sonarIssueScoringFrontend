import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  firstStep = false;
  secondStep = false;
  thirdStep = false;


  OnInput(event: any) {
    
    if((event.target.value).startsWith("www.github.com/") || (event.target.value).startsWith("https://www.github.com/")) {
      this.firstStep = true;
    } else {
      this.firstStep = false;
    }
  }

  /*
  selected = new FormControl(0);
  tabs:number = 3;
  index:number = 0;
  repo:string;

  OnInput(event: any) {
    
    //if((event.target.value).includes("github")) {
    if((event.target.value).startsWith("www.github.com/")) {
      console.log("GitHub!");
    } else if((event.target.value).startsWith("www.gitlab.com/")) {
      console.log("GitLab!");
    } else if((event.target.value).startsWith("www.subversion.com/")) {
      console.log("Subversion!");
    }
  }
*/
  



}
