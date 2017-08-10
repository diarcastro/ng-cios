import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cios-footer',
  templateUrl: './cios-footer.component.html',
  styleUrls: ['./cios-footer.component.scss']
})
export class CiosFooterComponent implements OnInit {

  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
