import { Component, OnInit } from '@angular/core';
import { ResultFile } from 'src/app/models/result-file.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  results = new Array<ResultFile>();

  constructor(private http: HttpClient) {
    this.getAllResults();
  }

  ngOnInit() {
  }

  getAllResults() {
    this.http.get<ResultFile[]>("/server/files/all-results")
              .subscribe(response => {
                this.results = response.map(item => {
                    return new ResultFile(item.name, item.date, item.repository, item.result);
                  });
                console.log(this.results);
              });

  }

}
