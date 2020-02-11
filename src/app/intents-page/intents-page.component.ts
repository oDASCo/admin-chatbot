import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-intents-page',
  templateUrl: './intents-page.component.html',
  styleUrls: ['./intents-page.component.scss']
})
export class IntentsPageComponent implements OnInit {
  public showTabs = false;
  public activeRoute: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
   this.getCurrentRoute();
   this.getActiveRoute();
  }

  private getCurrentRoute() {
    this.route.url.subscribe(() => {
      const currentPath = this.router.url.split('/').reverse();
      const pathState = currentPath[0].split('?')[0];
      this.showTabs = pathState === 'intents' || pathState === 'fallbacks';
    });
  }

  private getActiveRoute() {
    this.route.queryParams.subscribe(() => {
      const currentPath = this.router.url.split('/').reverse();
      this.activeRoute = currentPath[0].split('?')[0];
    });
  }
}
