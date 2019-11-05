import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  authUsername: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onConnectToGithub() {
    let url = "localhost:8080/server/git-repo?username=" + this.authUsername;
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
