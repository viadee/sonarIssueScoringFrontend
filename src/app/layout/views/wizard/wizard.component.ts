import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {FormControl} from '@angular/forms';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { Wizard } from 'src/app/models/wizard.model';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  firstStep = false;
  secondStep = false;
  thirdStep = false;
  // Step 1 (Repository)

  repositoryURL: string;
  URL: string;
  authUsername: string;
  Accordion = false; // Controlls the visability of the Accordion
  AccordionExpansion = false; // Controlls the Expansion of the Accordion
  progress = true;
  checkbutton = true;
  activeBranch: string;
  errorHTTP = false;

  repos;
  branches;

  // Step 2 (Cluster Config)

  h2o: string;
  Port: number;


  // Step 3 (Analysis Config)
  horizon: number;
  analyticsService: string;
    // Checkboxes
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

    // This Array is only for testing-purpose
    this.branches = [
      {name: 'master'},
      {name: 'test'},
      {name: 'HEAD'}
    ];

    this.analyticsService = 'cc';

  }



  // Functions for Step 1 (Repository)

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
    this.analyticsService = 'cc';
  }


  onConnectToGithub() {

    this.branches = null;
    this.activeBranch = null;

    if ((this.repositoryURL != null && this.authUsername != null) || (this.repositoryURL !== '' && this.authUsername !== '')) {
      if (this.repositoryURL.startsWith('http://') || this.repositoryURL.startsWith('https://')) {

        if (this.repositoryURL.includes('.com/')) {
          this.URL = this.repositoryURL.substring(((this.repositoryURL.indexOf('.com/')) + 5), this.repositoryURL.length);
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

  // Functions for Step 2 (Cluster Config)

  OnInputCluster() {
    if ((this.h2o != null && this.h2o != '') && this.Port != null) {
      this.secondStep = true;
    } else {
      this.secondStep = false;
    }
  }

  // Functions for Step 3 (Analysis Config)

  OnInputAnalysis() {
    if (this.horizon != null && this.horizon > 0) {
      this.thirdStep = true;
    } else {
      this.thirdStep = false;
    }
  }

  commitToBackend() {

    this.snackBar.open('Added to queque', '', {duration: 4000});

    let wizard = new Wizard(this.repositoryURL, this.authUsername, this.activeBranch, this.h2o, this.Port, this.horizon,
      this.checkFilenamePrefix, this.checkFilenamePostfix, this.checkPackage, this.checkDependenciesExternal,
      this.checkDependenciesInternal, this.checkComplexity, this.checkLines, this.checkAuthor, this.checkComments, this.checkWeekday);

    if (this.analyticsService == 'cc') {
      const myHeaders = new HttpHeaders();
      myHeaders.append('Content-Type', 'application/json');
      this.http.post('/server/analytics/change-count', wizard, {headers : myHeaders}).toPromise().then(data => {
        this.router.navigate(['/dashboard']);
      });
    } else if (this.analyticsService == 'oi') {
      const myHeaders = new HttpHeaders();
      myHeaders.append('Content-Type', 'application/json');
      this.http.post('/server/analytics/ordering-issues', wizard, {headers : myHeaders}).toPromise().then(data => {
        this.router.navigate(['/dashboard']);
      });
    }


  }


}
