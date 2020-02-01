import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {FormControl} from '@angular/forms';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  firstStep = false;
  secondStep = false;
  thirdStep = false;

  formResult;

  //Step 1 (Repository)

  repositoryURL: string;
  URL: string;
  authUsername: string;
  Accordion = false; //Controlls the visability of the Accordion
  AccordionExpansion = false; //Controlls the Expansion of the Accordion
  progress = true;
  checkbutton = true;
  activeBranch: string;
  errorHTTP = false;

  repos;
  branches;

  //Step 2 (Cluster Config)

  h2o: string;
  Port: number;


  //Step 3 (Analysis Config)
  horizon: number;
  analyticsService: string;
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

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {

    //This Array is only for testing-purpose
    this.branches = [
      {'name':'master'},
      {'name':'test'},
      {'name':'HEAD'}
    ];

    //JSON for form

    this.formResult = {
      'url': null ,
      'user': null ,
      'branch': null ,
      'h2o': null ,
      'port': null,
      'horizon': null,
    }

    /*
    this.formResult = [
      { 'url': null },
      { 'user': null },
      { 'branch': null },
      { 'h2o': null },
      { 'port': null},
      { 'horizon': null },
      { 'filenamePrefix': null },
      { 'filenamePostfix': null },
      { 'isPackage': null },
      { 'dependenciesExternal': null },
      { 'dependenciesInternal': null },
      { 'complexity': null },
      { 'lines': null },
      { 'author': null },
      { 'comments': null },
      { 'weekday': null }
    ];
    */
    this.analyticsService = "cc";
    
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
    this.analyticsService = "cc";
  }


  onConnectToGithub() {

    this.branches = null;
    this.activeBranch = null;

    if ((this.repositoryURL != null && this.authUsername != null) || (this.repositoryURL !== '' && this.authUsername !== '')) {
      if (this.repositoryURL.startsWith('http://') || this.repositoryURL.startsWith('https://')) {

        if (this.repositoryURL.includes('.com/')) {
          this.URL = this.repositoryURL.substring(((this.repositoryURL.indexOf('.com/'))+5), this.repositoryURL.length);
        } else {
          this.URL = null;
        }

      } else {
        this.URL = null;
      }


      if (this.URL != null) {
        this.progress = true;
        this.Accordion = true;
      }
      this.URL = this.URL.substr((this.authUsername.length + 1), this.URL.length);
      console.log('Try to connect to ' + this.URL + ' Repository');

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
    if ((this.repositoryURL != null && this.repositoryURL != '') && (this.authUsername != null && this.authUsername != '')) {
      if (this.repositoryURL.startsWith('http://') && this.repositoryURL.includes('.com/')) {
        this.checkbutton = false;
      } else if (this.repositoryURL.startsWith('https://') && this.repositoryURL.includes('.com/')) {
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
    if((this.h2o != null && this.h2o != '') && this.Port != null) {
      this.secondStep = true;
    } else {
      this.secondStep = false;
    }
  }

  //Functions for Step 3 (Analysis Config)

  OnInputAnalysis() {
    if(this.horizon != null && this.horizon > 0) {
      this.thirdStep = true;
    } else {
      this.thirdStep = false;
    }
  }

  commitToBackend() {

    this.snackBar.open('Added to queque', '', {duration: 4000});

    //JSON:
    this.formResult = {
      'url': this.URL ,
      'user': this.authUsername ,
      'branch': this.activeBranch ,
      'h2o': this.h2o,
      'port': this.Port,
      'horizon': this.horizon,
    }

    /*
    this.formResult.url = this.URL;
    this.formResult.user = this.authUsername;
    this.formResult.branch = this.activeBranch;
    this.formResult.h2o = this.h2o;
    this.formResult.port = this.Port;
    this.formResult.horizon = this.horizon;
    this.formResult.filenamePrefix = this.checkFilenamePrefix;
    this.formResult.filenamePostfix = this.checkFilenamePostfix;
    this.formResult.isPackage = this.checkPackage;
    this.formResult.dependenciesExternal = this.checkDependenciesExternal;
    this.formResult.dependenciesInternal = this.checkDependenciesInternal;
    this.formResult.complexity = this.checkComplexity;
    this.formResult.lines = this.checkLines;
    this.formResult.author = this.checkAuthor;
    this.formResult.comments = this.checkComments;
    this.formResult.weekday = this.checkWeekday;
    */
    //Console Output

    console.log("The analysis will start with these parameters:");
    console.log('Repository URL: ' + this.formResult.url);
    console.log('User: ' + this.formResult.user);
    console.log('Branch: ' + this.formResult.branch);
    console.log('H²O URL: ' + this.formResult.h2o + ':' + this.formResult.port);
    console.log('Horizon: ' + this.formResult.horizon + ' comit(s)');

    console.log('Filename-Prefix: ' + this.formResult.filenamePrefix);
    console.log('Filename-Postfix: ' + this.formResult.filenamePostfix);
    console.log('Package: ' + this.formResult.isPackage);
    console.log('Dependencies (external): ' + this.formResult.dependenciesExternal);
    console.log('Dependencies (internal): ' + this.formResult.dependenciesInternal);
    console.log('Complexity: ' + this.formResult.complexity);
    console.log('LinesOfCode: ' + this.formResult.lines);
    console.log('Author: ' + this.formResult.author);
    console.log('Comments: ' + this.formResult.comments);
    console.log('Weekday: ' + this.formResult.weekday);


    
    if(this.analyticsService == "cc") {
      console.log('Service: Change-Count');
      this.http.post('https://localhost:3000/server/analytics/change-count', this.formResult).toPromise().then(data => {
        this.router.navigate(['/dashboard']);
      });
    } else if(this.analyticsService == "oi") {
      console.log('Service: Order-Issue');
      this.http.post('http://localhost:3000/server/analytics/ordering-issues', this.formResult).toPromise().then(data => {
        this.router.navigate(['/dashboard']);
      });
    }


  }
  

}
