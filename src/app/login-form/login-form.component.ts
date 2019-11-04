import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

class GitServer {
  private username?: string;
  private token?: string;

  constructor() {}

  getUsername() {
    return this.username;
  }

  getToken() {
    return this.token;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setToken(token: string) {
    this.token = token;
  }
}
