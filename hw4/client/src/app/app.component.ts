import { Component, OnInit } from '@angular/core';
import { Globals } from './_sevice/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  isBackground = true;

  constructor(
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.isBackground = this.globals.isBackground;
  }
}

