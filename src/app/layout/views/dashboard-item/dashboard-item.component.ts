import { Component, OnInit, Input } from '@angular/core';
import { ResultFile } from 'src/app/models/result-file.model';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {
  @Input() result: ResultFile;

  constructor() { }

  ngOnInit() {
  }

}
