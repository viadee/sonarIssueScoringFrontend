import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, filter, catchError, mergeMap } from "rxjs/operators";
//import { Subject } from 'rxjs/Subject';

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  authUsername: string;
  repositories: Observable<any>;
  constructor(private http: HttpClient) {}

  repos;
  branches;

  ngOnInit() {
  }

  showRepo() {
    console.log(this.repos[0].branches[0].name);
  }

  onConnectToGithub() {
    this.http
      .get("/api/server/git-repo?username=" + this.authUsername)
      .subscribe(repos => {
        this.repos = repos;
        this.branches = this.repos[0].branches;
        var i;
        for (i in this.repos[0].branches) {
          console.log(this.repos[0].branches[i].name);
        }
      });
  }
}

class Repository {
  private id: number;
  private name: string;
  private full_name: string;
  private owner: User;
  private branches: Branch[];


  constructor(id: number, name: string, full_name: string, owner: User, branches:Branch[]) {
    this.id = id;
    this.name = name;
    this.full_name = full_name;
    this.owner = owner;
    this.branches = branches;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getFull_name() {
    return this.full_name;
  }

  getOwner() {
    return this.owner;
  }

  getBranches() {
    return this.branches;
  }
}

class Branch {
  private name: string;

  constructor(name : string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class User {
  private login: string;
  private id: BigInteger;
  private url: string;

  constructor(login: string, id: BigInteger, url: string) {
    this.login = login;
    this.id = id;
    this.url = url;
  }

  getLogin() {
    return this.login;
  }

  getId() {
    return this.id;
  }

  getUrl() {
    return this.url;
  }
}
