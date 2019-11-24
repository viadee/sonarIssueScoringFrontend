import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, filter, catchError, mergeMap } from "rxjs/operators";

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


  //Test-------------------
  branch1:Branch = new Branch("master");
  branch2:Branch = new Branch("SNAPSHOT");
  branchArray = [this.branch1, this.branch2];
  testVar:Repository = new Repository(1, "viadee", this.branchArray);

  ngOnInit() {
    /*
    var ausgabe:Branch[];
    console.log(this.testVar.getBranches()[0].getName());
    */
  }

  showRepo() {
    console.log(this.repos[0].getBranches()[0].getName());
  }
  
  
  
  //---------------------------

  onConnectToGithub() {
    
    this.http
      .get<Repository[]>("/api/server/git-repo?username=" + this.authUsername)
      .subscribe(repos => {
        //console.log(repos)
        this.repos = repos;
      });
  } 
}

class Repository {
  private id: number;
  private name: string;
  private branches: Branch[];
  

  constructor(id: number, name: string, branches:Branch[]) {
    this.id = id;
    this.name = name;
    this.branches = branches;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
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
