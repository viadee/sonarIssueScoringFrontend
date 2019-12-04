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
  repositoryURL: string;
  URL: string;
  authUsername: string;
  firstStep = false;
  secondStep = false;
  thirdStep = false;
  Accordion = false; //Controlls the Expansion of the Accordion
  progress = true;
  checkbutton = true;

  repos;
  branches;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  hardReset() {
    this.firstStep = false;
    this.secondStep = false;
    this.thirdStep = false;
    this.Accordion = false;
    this.branches = null;
    this.authUsername = null;
    this.repos = null;
    this.repositoryURL = null;
    this.URL = null;
    this.checkbutton = true;
  }

  softReset() {
    this.firstStep = false;
    this.secondStep = false;
    this.thirdStep = false;
    this.Accordion = false;
    this.branches = null;
    this.authUsername = null;
    this.repos = null;
    this.URL = null;
  }

  onConnectToGithub() {

    this.branches = null;


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
      console.log(this.URL);

      this.http
       .get('http://localhost:3000/server/git-repo/public/branches?username=' + this.authUsername +  '&repo=' + this.URL)
       .subscribe(branches => {
          this.branches = branches;
          this.progress = false;

          if (this.branches != null) {

            this.Accordion = true;
          } else {
            this.Accordion = false;
          }
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
}
