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

  ngOnInit() {}

  onConnectToGithub() {
    this.http
      .get("/api/server/git-repo?username=trnhan251")
      .subscribe(repos => console.log(repos));
  }
}

class Repository {
  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}
