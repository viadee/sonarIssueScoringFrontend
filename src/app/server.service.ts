import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export class ServerService {
  repos: Observable<any>;

  constructor(private http: HttpClient) {}

  connectToPublicGithub(username: String) {
    let url = "/api/git-repo?username=" + username;
    this.http.get(url).subscribe(repos => console.log(repos));
  }
}
