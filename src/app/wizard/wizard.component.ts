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

  firstStep = false;
  secondStep = false;
  thirdStep = false;

  //Step 1 (Repository)

  repositoryURL : string;
  URL : string;
  authUsername : string;
  Accordion = false; //Controlls the visability of the Accordion
  AccordionExpansion = false; //Controlls the Expansion of the Accordion
  progress = true;
  checkbutton = true;
  activeBranch : string;
  errorHTTP = false;

  repos;
  branches;

  //Step 2 (Cluster Config)
  H2O : string;
  Port : number;
  
  //Step 3 (Analysis Config)
  Horizon : number;
    //Checkboxes
    checkFilenamePrefix = false;
    checkFilenamePostfix = false;
    checkPackage = false;
    checkDependenciesExternal = false;
    checkDependenciesInternal = false;
    checkComplexity = false;
    checkLines = false;
    checkAuthor = false;
    checkComments = false;
    checkWeekday = false;
  

  constructor(private http: HttpClient) {}

  ngOnInit() {

    //This Array is only for testing-purpose
    this.branches = [
      {"name":"master"},
      {"name":"test"},
      {"name":"HEAD"}
  ];
  }

  //Functions for Step 1 (Repository)

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
    this.checkFilenamePrefix = false;
    this.checkFilenamePostfix = false;
    this.checkPackage = false;
    this.checkDependenciesExternal = false;
    this.checkDependenciesInternal = false;
    this.checkComplexity = false;
    this.checkLines = false;
    this.checkAuthor = false;
    this.checkComments = false;
    this.checkWeekday = false;
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
       .get('/server/git-repo/public/branches?username=' + this.authUsername +  '&repo=' + this.URL)
       .subscribe(branches => {
          this.branches = branches;
          this.AccordionExpansion = true;
          this.progress = false;
          this.errorHTTP = false;
          this.OnInputCluster();
          this.OnInputAnalysis();
        }, error => {
          this.progress = false;
          this.firstStep = false;
          this.AccordionExpansion = false;
          this.errorHTTP = true;
        });
    }

  }

  OnInputRepository(event: any) {
    if ((this.repositoryURL != null && this.repositoryURL != "") && (this.authUsername != null && this.authUsername != '')) {
      if (this.repositoryURL.startsWith('github.com/')) {
        this.checkbutton = false;
      } else if (this.repositoryURL.startsWith('https://github.com/')) {
        this.checkbutton = false;
      } else {
        this.checkbutton = true;
      }
    } else {
      this.checkbutton = true;
    }
  }

  chooseBranch() {
    this.firstStep = true;
  }

  //Functions for Step 2 (Cluster Config)

  OnInputCluster() {
    if((this.H2O != null && this.H2O != "") && this.Port != null) {
      this.secondStep = true;
    } else {
      this.secondStep = false;
    }
  }

  //Functions for Step 3 (Analysis Config)

  OnInputAnalysis() {
    if(this.Horizon != null && this.Horizon > 0) {
      this.thirdStep = true;
    } else {
      this.thirdStep = false;
    }
  }

  commitToBackend() {
    console.log("The analysis will start with:");
    console.log("Repository URL: " + this.URL);
    console.log("User: " + this.authUsername);
    console.log("Branch: " + this.activeBranch);
    console.log("H²O URL: " + this.H2O + ":" + this.Port);
    console.log("Horizon: " + this.Horizon + " comit(s)");
  
    console.log("Filename-Prefix: " + this.checkFilenamePrefix);
    console.log("Filename-Postfix: " + this.checkFilenamePostfix);
    console.log("Package: " + this.checkPackage);
    console.log("Dependencies (external): " + this.checkDependenciesExternal);
    console.log("Dependencies (internal): " + this.checkDependenciesInternal);
    console.log("Complexity: " + this.checkComplexity);
    console.log("LinesOfCode: " + this.checkLines);
    console.log("Author: " + this.checkAuthor);
    console.log("Comments: " + this.checkComments);
    console.log("Weekday: " + this.checkWeekday);
  }

}
