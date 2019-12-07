import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {FormControl} from '@angular/forms';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; //

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  repositoryURL : string;
  URL : string;
  authUsername : string;
  firstStep = false;
  secondStep = false;
  thirdStep = false;
  Accordion = false; //Controlls the visability of the Accordion
  AccordionExpansion = false; //Controlls the Expansion of the Accordion
  progress = true;
  checkbutton = true;
  activeBranch : string;
  errorHTTP = false;
  

  repos;
  branches;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    //This Array is only for testing-purpose
    this.branches = [
      {"name":"master"},
      {"name":"test"},
      {"name":"HEAD"}
  ];
  }

  Reset() {
    this.firstStep = false;
    this.secondStep = false;
    this.thirdStep = false;
    this.Accordion = false;
    this.AccordionExpansion = false;
    this.branches = null;
    this.authUsername = null;
    this.repos = null;
    this.repositoryURL = null;
    this.URL = null;
    this.checkbutton = true;
    this.activeBranch = null;
    this.errorHTTP = false;
  }


  onConnectToGithub() {

    this.branches = null;
    this.activeBranch = null;

    if ((this.repositoryURL != null && this.authUsername != null) || (this.repositoryURL !== '' && this.authUsername !== '')) {
      if (this.repositoryURL.startsWith('github.com/')) {
        this.URL = this.repositoryURL.substr(11, this.repositoryURL.length);
      } else if (this.repositoryURL.startsWith('https://github.com/')) {
        this.URL = this.repositoryURL.substr(19, this.repositoryURL.length);
      } else {
        this.URL = null;
      }

      if (this.URL != null) {
        this.progress = true;
        this.Accordion = true;
      }
      /*
      this.http
      .get("/server/git-repo/public?username=" + this.authUsername)
      .subscribe(repos => {
        this.repos = repos;

        for(var i in this.repos) {
          if(this.repos[i].full_name == this.URL) {
            this.branches = this.repos[i].branches;
          }
        }
        */

      this.URL = this.URL.substr((this.authUsername.length + 1), this.URL.length);
      console.log("Try to connect to " + this.URL + " Repository");

      this.http
       .get('http://localhost:3000/server/git-repo/public/branches?username=' + this.authUsername +  '&repo=' + this.URL)
       .subscribe(branches => {
          this.branches = branches;
          this.AccordionExpansion = true;
          this.progress = false;
          this.errorHTTP = false;
        }, error => {
          this.progress = false;
          this.firstStep = false;
          this.AccordionExpansion = false;
          this.errorHTTP = true;
        });
    }

  }

  OnInput(event: any) {
    if ((this.repositoryURL != null && this.authUsername != null) || (this.repositoryURL !== '' && this.authUsername !== '')) {
      if (this.repositoryURL.startsWith('github.com/')) {
        this.checkbutton = false;
      } else if (this.repositoryURL.startsWith('https://github.com/')) {
        this.checkbutton = false;
      } else {
        this.checkbutton = true;
      }
    }
  }

  chooseBranch() {
    console.log(this.activeBranch);
    this.firstStep = true;
  }

  showcase() {
    console.log("The analysis will start with:");
    console.log("Repository URL: " + this.URL);
    console.log("User: " + this.authUsername);
    console.log("Branch: " + this.activeBranch);
    console.log("H²O URL: ");
    console.log();
  }

}
