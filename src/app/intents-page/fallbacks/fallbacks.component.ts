import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-fallbacks',
  templateUrl: './fallbacks.component.html'
})
export class FallbacksComponent implements OnInit {
  public fallbacks: Array<any> = [];
  public searchStr = '';

  ngOnInit() {
    this.fallbacks = [
      {
        name: 'new',
        description: 'new'
      },
      {
        name: 'new1',
        description: 'new1'
      }
    ];
  }
}
